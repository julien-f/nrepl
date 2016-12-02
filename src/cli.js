#!/usr/bin/env node

import nrepl from './'

nrepl().catch(error => {
  console.error(error)
})
