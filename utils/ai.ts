import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';
import z from 'zod';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who write the journal entry.'),
    summary: z.string().describe('Quick summary of the entire entry.'),
    negative: z
      .boolean()
      .describe(
        'Is the journal entry negative? (i.e. does it contain negative emotions?).',
      ),
    color: z
      .string()
      .describe(
        'A hexidecimal color code that represents the mood of the entry. Example #FFFF00 for something invoking a happy mood and #175981 for something invoking a sad mood, does not need to stricly be those colors just depending on the spectrum of emotion determine what the color should be',
      ),
  }),
);

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format insructions, no matter what! \n {format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  console.log(input);
  return input;
};

export const analyze = async (content) => {
  const input = await getPrompt(content);

  //* temperature is how creative the answers will be as it looks through more
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const result = await model.call(input);

  console.log(result);
};
