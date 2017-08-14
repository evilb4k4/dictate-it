// streaming speech recognition
const record = require('node-record-lpcm16');
const Speech = require('@google-cloud/speech');

const projectId = 'dictate-it-176723';

// Instantiates a client
const speechClient = Speech({
  projectId: projectId
});

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: true,
};

const recognizeStream = speechClient.streamingRecognize(request)
  .on('error', console.error)
  .on('data', data =>
    process.stdout.write(
      (data.results[0] && data.results[0].alternatives[0])
      ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
      : `\n\nReached transcription time limit, press Ctrl+C\n`));

record
  .start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    silence: '60',
    verbose: false,
  })
  .on('error', console.error)
  .pipe(recognizeStream);

console.log('Listening, press Ctrl+C to stop.');
