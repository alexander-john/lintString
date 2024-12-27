const { ESLint } = require("eslint");

async function lintAndFixString(code) {
  // Create an ESLint instance configured to always enforce semicolons
  const eslint = new ESLint({
    fix: true,
    overrideConfigFile: true,
    overrideConfig: {
      rules: {
        semi: ["error", "always"],
      },
    },
  });

  // Lint the provided string
  const results = await eslint.lintText(code, { filePath: "inline.js" });

  // Retrieve ESLint's "stylish" formatter
  const formatter = await eslint.loadFormatter("stylish");

  // Format the lint results (warnings, errors, etc.)
  const resultText = formatter.format(results);

  // Print lint results
  console.log("===== ESLint Report =====");
  console.log(resultText);

  // Extract the fixed code from the first result (if any fixes were made)
  const [lintResult] = results;
  const fixedCode = lintResult.output ?? code;

  // Print the fixed code
  console.log("===== Fixed Code =====");
  console.log(fixedCode);

  // Return the fixed code
  return fixedCode;
}

// Example usage
(async function main() {
  // Code snippet missing semicolons
  const codeString = `
    const a = 1
    console.log(a)
  `;

  try {
    const fixed = await lintAndFixString(codeString);
    // Do something else with the fixed code if you want
  } catch (error) {
    console.error("Linting failed:", error);
  }
})();
