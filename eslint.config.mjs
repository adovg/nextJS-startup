import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Разрешаем неиспользуемые переменные, если они начинаются с _
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Разрешаем 'any', но с предупреждением
      "@typescript-eslint/no-explicit-any": "warn",
      // Другие правила по желанию
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
