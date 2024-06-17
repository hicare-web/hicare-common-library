import path from "path";
import { defineConfig } from "vite";
import viteTsconfigPaths from 'vite-tsconfig-paths';

const isExternal = (id: string) => !id.startsWith(".") && !path.isAbsolute(id);

export const getBaseConfig = ({ plugins = [], lib }: any) =>
    defineConfig({
        plugins: [...plugins, viteTsconfigPaths()],
        build: {
            lib,
            rollupOptions: {
                external: isExternal,
            },
        },
    });

// 참고 https://betterprogramming.pub/lerna-monorepo-with-vite-and-storybook-e29e54559214