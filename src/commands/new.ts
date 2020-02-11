import { GluegunToolbox, print } from 'gluegun'
import { printHelper } from '../functions/generic-functions';

// const command = (toolbox: GluegunToolbox) => {
//   console.log(2);
// }

const helpPrint = () => {
  printHelper('arguments:', [
    { name: 'name', helper: 'Set the name of project' }
  ])

  print.newline();

  printHelper('options:', [
    { name: '--typescript (-t)', helper: 'Set the project to use typescript as language, JavaScript is default' },
  ])
}

module.exports = {
  name: 'new',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters } = toolbox

    const { h, help } = parameters.options;

    if (h || help) {
      return helpPrint();
    }

    let name = parameters.first;
    let type = parameters.second;
    let questions = []

    const askName = { type: 'input', name: 'name', message: 'Give a name to your project' }

    const askType = {
      type: 'select',
      name: 'type',
      message: 'Which language would you like to use?',
      choices: ['Javascript', 'Typescript'],
    }

    if (!name) {
      questions.push(askName)
    }
    if (!type || !(type === 'typescript' || type === 'javascript')) {
      questions.push(askType)
    }

    const answer = await toolbox.prompt.ask(questions)

    name = answer.name ? answer.name : name;
    type = answer.type ? answer.type : type;

    console.log(name, type);

    // command(toolbox);
    // await generate({
    //   template: 'model.ts.ejs',
    //   target: `models/${name}-model.ts`,
    //   props: { name }
    // })

    // info(`Generated file at models/${name}-model.ts`)
  }
}