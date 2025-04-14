
import {
  type EnvironmentConfig,
  type RsbuildConfig,
} from '@rsbuild/core';
import type { RslibConfig } from "@rslib/core"
import type {
  ExcludesFalse,
  Format,
  RequireKey,
  RsbuildConfigWithLibInfo,
} from './types';
import { unstable_composeCreateRsbuildConfig as composeCreateRsbuildConfig } from "@rslib/core"

export async function composeRsbuildEnvironments(
  rslibConfig: RslibConfig,
): Promise<{
  environments: Record<string, EnvironmentConfig>;
  environmentWithInfos: RequireKey<RsbuildConfigWithLibInfo, 'id'>[];
}> {
  const rsbuildConfigWithLibInfo =
    await composeCreateRsbuildConfig(rslibConfig);
  const environmentWithInfos: RequireKey<RsbuildConfigWithLibInfo, 'id'>[] = [];

  // User provided ids should take precedence over generated ids.
  const usedIds = rsbuildConfigWithLibInfo
    .map(({ id }) => id)
    .filter(Boolean as any as ExcludesFalse);
  const environments: RsbuildConfig['environments'] = {};
  const formatCount: Record<Format, number> = rsbuildConfigWithLibInfo.reduce(
    (acc, { format }) => {
      acc[format] = (acc[format] ?? 0) + 1;
      return acc;
    },
    {} as Record<Format, number>,
  );

  const composeDefaultId = (format: Format): string => {
    const nextDefaultId = (format: Format, index: number) => {
      return `${format}${formatCount[format] === 1 && index === 0 ? '' : index}`;
    };

    let index = 0;
    let candidateId = nextDefaultId(format, index);
    while (usedIds.indexOf(candidateId) !== -1) {
      candidateId = nextDefaultId(format, ++index);
    }
    usedIds.push(candidateId);
    return candidateId;
  };

  for (const { format, id, config } of rsbuildConfigWithLibInfo) {
    const libId = typeof id === 'string' ? id : composeDefaultId(format);
    environments[libId] = config;
    environmentWithInfos.push({ id: libId, format, config });
  }

  const conflictIds = usedIds.filter(
    (id, index) => usedIds.indexOf(id) !== index,
  );
  if (conflictIds.length) {
    throw new Error(
      `The following ids are duplicated: ${conflictIds.map((id) => `"${id}"`).join(', ')}. Please change the "lib.id" to be unique.`,
    );
  }

  return { environments, environmentWithInfos };
}

export const pruneEnvironments = (
  environments: Record<string, EnvironmentConfig>,
  libs?: string[],
): Record<string, EnvironmentConfig> => {
  if (!libs) {
    return environments;
  }

  const filteredEnvironments = Object.fromEntries(
    Object.entries(environments).filter(([name]) => libs.includes(name)),
  );

  if (Object.keys(filteredEnvironments).length === 0) {
    throw new Error(
      `The following libs are not found: ${libs.map((lib) => `"${lib}"`).join(', ')}.`,
    );
  }

  return filteredEnvironments;
};
