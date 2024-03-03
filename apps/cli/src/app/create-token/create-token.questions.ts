import { findPreset, presets } from '@tokengator/presets'
import { Question, QuestionSet } from 'nest-commander'

@QuestionSet({ name: 'create-token-questions' })
export class CreateTokenQuestions {
  @Question({
    message: 'Which preset would you like to use?',
    name: 'preset',
    type: 'list',
    choices: presets.map((p) => ({ value: p.id, name: p.name })),
  })
  parsePreset(val: string) {
    return findPreset(val).id
  }
}
