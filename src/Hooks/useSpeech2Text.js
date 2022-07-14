import React, { useEffect, useState } from 'react'
import { useSpeechRecognition } from 'react-speech-recognition'
import { useDebouncedCallback } from 'use-debounce'

const useSpeech2Text = () => {
    const [record, setRecord] = useState(false)
    const [listening, setListening] = useState(false)
    const [transcript, setTranscript] = useState('')
    // const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()
    let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    let recognition = new SpeechRecognition()
    let speechRecognitionList = new SpeechGrammarList()
    let moods = ['左葉', '右葉', '左腎', '右腎']
    let grammar = '#JSGF V1.0; grammar moods; public <moods> = ' + moods.join(' | ') + ';'
    speechRecognitionList.addFromString(grammar, 1)

    recognition.grammars = speechRecognitionList
    recognition.lang = 'zh-TW'
    recognition.continuous = true
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    useEffect(() => {
        if (record) {
            setListening(true)
            recognition.start()
            recognition.onresult = ({ results }) => {
                const resultIndex = results.length - 1
                setTranscript(results[resultIndex][0].transcript)
            }
        } else {
            recognition.stop()
            setListening(false)
            setTranscript('')
        }
    }, [record])

    // const stop = useDebouncedCallback(() => {
    //     resetTranscript()
    // }, 500)

    // useEffect(() => {
    //     if (transcript) stop()
    // }, [transcript])

    // useEffect(() => {
    //     if (record) SpeechRecognition.startListening({ continuous: true, language: 'zh-TW' })
    //     else {
    //         SpeechRecognition.stopListening()
    //         resetTranscript()
    //     }
    // }, [record])

    return { transcript, setRecord, listening }
}

export default useSpeech2Text
