// bin/build.ts
import ParcelBundler from 'parcel-bundler';

async function build(): Promise<void> {
  const serverBundler = new ParcelBundler(['src/index.ts'], {
    outDir: 'lib',
    outFile: 'index.js',
    bundleNodeModules: true,
    target: 'node',
    contentHash: true,
    watch: false,
    sourceMaps: false,
    cache: false
  });
  await serverBundler.bundle()
}

build()