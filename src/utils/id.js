import uuid from 'uuid/v5'

export const appId = uuid((Math.random()*999999).toString(), uuid.URL)