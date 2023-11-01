const { execSync } = require('node:child_process');

const execJson = (command) => JSON.parse(execSync(command).toString())
const execString = (command) => execSync(command).toString().replace(/\s/g, "")

let sinks = execJson('pactl -f json list sinks')

const defaultSink = execString('pactl get-default-sink')
const defaultSinkIndex = sinks.findIndex((sink) => sink.name === defaultSink)

const nextDefaultSinkIndex = (defaultSinkIndex + 1) % sinks.length;
const nextDefaultSink = sinks[nextDefaultSinkIndex]

execSync('pactl set-default-sink ' + nextDefaultSink.name)
