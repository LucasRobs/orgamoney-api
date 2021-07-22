import {MigrationInterface, QueryRunner} from "typeorm";

export class createEntities1626907614078 implements MigrationInterface {
    name = 'createEntities1626907614078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "income" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "value" double precision NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "monthId" uuid, "categoryId" integer, CONSTRAINT "PK_29a10f17b97568f70cee8586d58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "month" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "yearId" uuid, CONSTRAINT "PK_e253c67eb75a81acf16f7f79323" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "year" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_506885a7430147dbff28fa689fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "value" double precision NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "monthId" uuid, "categoryId" integer, CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "income" ADD CONSTRAINT "FK_2286de962d4b0493130bf4186b5" FOREIGN KEY ("monthId") REFERENCES "month"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "income" ADD CONSTRAINT "FK_977569f13a51a1ec583765daffd" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "month" ADD CONSTRAINT "FK_752eb134f3b3e6fa8c6b7b57739" FOREIGN KEY ("yearId") REFERENCES "year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "year" ADD CONSTRAINT "FK_b7be7f2f391d79ac12b2f27033a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_291b7b64c62ec7163025dfccbe2" FOREIGN KEY ("monthId") REFERENCES "month"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_ddb6e5c07f27ceae2925e1fec29" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_ddb6e5c07f27ceae2925e1fec29"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_291b7b64c62ec7163025dfccbe2"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "year" DROP CONSTRAINT "FK_b7be7f2f391d79ac12b2f27033a"`);
        await queryRunner.query(`ALTER TABLE "month" DROP CONSTRAINT "FK_752eb134f3b3e6fa8c6b7b57739"`);
        await queryRunner.query(`ALTER TABLE "income" DROP CONSTRAINT "FK_977569f13a51a1ec583765daffd"`);
        await queryRunner.query(`ALTER TABLE "income" DROP CONSTRAINT "FK_2286de962d4b0493130bf4186b5"`);
        await queryRunner.query(`DROP TABLE "bill"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "year"`);
        await queryRunner.query(`DROP TABLE "month"`);
        await queryRunner.query(`DROP TABLE "income"`);
    }

}
