import { Environment } from 'vitest';

/**
 * #1 - execute npm link in this path
 * #2 - back to main path project
 * #3 - execute npm link vitest-environment-prisma
 */

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('setup');
    return {
      teardown() {
        console.log('teardown');
      },
    };
  },
};
