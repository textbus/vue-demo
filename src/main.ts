import { Editor } from '@/editor'
import { Commander, Query, QueryStateType, Selection } from '@textbus/core';
import { boldFormatter } from '@/textbus/formatters/bold.formatter';
import { fontSizeFormatter } from '@/textbus/formatters/font-size.formatter';
import { alignAttribute } from '@/textbus/attrs/align.attribute';
import { backgroundColorFormatter } from '@/textbus/formatters/background-color.formatter';

const xNote = new Editor()

xNote.mount(document.getElementById('app')!)


const boldBtn = document.getElementById('bold')!
const fontSizeBtn = document.getElementById('fontSize')!
const alignBtn = document.getElementById('align')!
const backgroundColorBtn = document.getElementById('backgroundColor')!

backgroundColorBtn.addEventListener('click', () => {
  commander.applyFormat(backgroundColorFormatter, '#f00')
})

alignBtn.addEventListener('click', () => {
  commander.applyAttribute(alignAttribute, 'right')

  // commander.unApplyAttribute(alignAttribute)
})

fontSizeBtn.addEventListener('click', () => {
  commander.applyFormat(fontSizeFormatter, '40px')
})

const commander = xNote.get(Commander)
const query = xNote.get(Query)
const selection = xNote.get(Selection)

selection.onChange.subscribe(() => {
  const queryState = query.queryFormat(boldFormatter)
  if (queryState.state === QueryStateType.Enabled) {
    boldBtn.style.color = '#0f0'
  } else {
    boldBtn.style.color = ''
  }
})

boldBtn.addEventListener('click', () => {
  const queryState = query.queryFormat(boldFormatter)

  if (queryState.state === QueryStateType.Enabled) {
    commander.unApplyFormat(boldFormatter)
  } else {
    commander.applyFormat(boldFormatter, true)
  }
})


// import { createApp } from 'vue';
// import Page from '@/page.vue';
//
// createApp(Page).mount('#app')
