import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  Question: a.model({
    questionId: a.id().required(),
    questionText: a.string(),
    passageText: a.string(),
    options: a.customType({
      A: a.string(),
      B: a.string(),
      C: a.string(),
      D: a.string(),
    }),
    correctAnswer: a.string(),
    answerExplanation: a.string(),
    category: a.string(),
    subCategory: a.string(),
    questionType: a.string(),
    difficulty: a.string(),
    status: a.string(),
    tags: a.string().array(),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
    version: a.integer(),
  })
  .identifier(['questionId'])
  .authorization(allow => [
    allow.owner(), // Allows record owners full access
    allow.authenticated().to(['read']), // Allows authenticated users read access
  ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
});

