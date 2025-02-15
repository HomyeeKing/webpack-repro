import { minify_sync } from 'terser';

// Create a test file
const code = ` // CONCATENATED MODULE: ./.ice/pegasus.server.entry.home.ts

      const phaManifestStr = '{{PHA_MANIFEST_OUTPUT_PLACEHOLDER}}';
      console.log('phaManifestStr', phaManifestStr);
      const url = '/home';
      const disableOnErrorDowngrade = false;
      console.log('disableOnErrorDowngrade', disableOnErrorDowngrade);
      console.log('!disableOnErrorDowngrade', !disableOnErrorDowngrade);`;

// Configure Terser with debugging options
const options = {
  compress: {
    booleans: false,
    evaluate: true,
  },
  sourceMap: true,
  mangle: false,
};

// Add a breakpoint or console.log before running the transformation
console.log('Starting transformation');
const result = minify_sync(code, options);
console.log('Transformation complete:', result.code);
