type MessageValue = string | { [key: string]: MessageValue };
type MessageTree = Record<string, MessageValue>;

function collectKeys(tree: MessageTree, prefix = ""): string[] {
  return Object.entries(tree).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === "string" ? [path] : collectKeys(value, path);
  });
}

export function findMissingMessageKeys(sr: MessageTree, en: MessageTree) {
  const srKeys = new Set(collectKeys(sr));
  const enKeys = new Set(collectKeys(en));

  return {
    missingInEn: [...srKeys].filter((key) => !enKeys.has(key)),
    missingInSr: [...enKeys].filter((key) => !srKeys.has(key)),
  };
}

// Puca u build-u/dev-u ako sr i en poruke nemaju iste ključeve (poglavlje 8.3)
export function validateMessages(sr: MessageTree, en: MessageTree): void {
  const { missingInEn, missingInSr } = findMissingMessageKeys(sr, en);

  if (missingInEn.length === 0 && missingInSr.length === 0) {
    return;
  }

  const lines: string[] = [];
  if (missingInEn.length > 0) {
    lines.push(`nedostaje u en: ${missingInEn.join(", ")}`);
  }
  if (missingInSr.length > 0) {
    lines.push(`nedostaje u sr: ${missingInSr.join(", ")}`);
  }

  throw new Error(`i18n validator — ${lines.join(" | ")}`);
}
