import dotenv from 'dotenv'
import inquirer from 'inquirer'
import colors from 'colors'

dotenv.config()

export const menu = async () => {
  console.clear()

  const questions = [
    {
      type: 'list',
      name: 'menuOption',
      message: 'Message',
      choices: [
        { name: `${colors.green('1.')} Find place`, value: 1 },
        { name: `${colors.green('2.')} History`, value: 2 },
        { name: `${colors.green('0.')} Exit`, value: 0 },
      ],
    },
  ]

  const { menuOption } = await inquirer.prompt(questions)

  return menuOption
}

export const pause = async () => {
  const questions = [
    {
      type: 'input',
      name: 'pause',
      message: `Press ${colors.green('ENTER')} for continue`,
    },
  ]

  await inquirer.prompt(questions)
}

export const readInput = async message => {
  const question = {
    type: 'input',
    name: 'input',
    message,
    validate(value) {
      if (value.length < 1) {
        return 'Please, inter value'
      }

      return true
    },
  }

  const { input } = await inquirer.prompt(question)

  return input
}

export const placesList = async (places = []) => {
  const choices = places.map((place, i) => {
    const idx = colors.green(`${i + 1}`)
    const description = place.name

    return {
      value: place.id,
      name: `${idx}. ${description}`,
    }
  })

  choices.unshift({
    value: 0,
    name: `${colors.green('0')}. Cancel`,
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select Place',
      choices,
    },
  ]

  const { id } = await inquirer.prompt(questions)

  return id
}

export const confirm = async message => {
  const question = [{ type: 'confirm', name: 'ok', message }]

  const { ok } = await inquirer.prompt(question)

  return ok
}

export const checkList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = colors.green(`${i + 1}`)
    const description = task.description

    return {
      value: task.id,
      name: `${idx}. ${description}`,
      checked: !!task.completedAt,
    }
  })

  const questions = [
    {
      type: 'checkbox',
      name: 'idx',
      message: 'Select',
      choices,
    },
  ]

  const { idx } = await inquirer.prompt(questions)

  return idx
}
