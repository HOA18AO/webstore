import { MigrationInterface } from 'typeorm';

export class InitialSchema1707191000000 implements MigrationInterface {
  name = 'InitialSchema1707191000000';

  public async up(): Promise<void> {
    // Migration already exists in database via synchronize: true
    // This file serves as documentation that schema was initialized
    // Future migrations will be generated here
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    // Revert would drop all tables
    throw new Error(
      'Cannot revert initial schema - database would be destroyed',
    );
  }
}
