import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useDebouncedCallback } from 'use-debounce'

const useSpeech2Text = () => {
    const [record, setRecord] = useState(false)
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

    const stop = useDebouncedCallback(() => {
        resetTranscript()
    }, 500)

    useEffect(() => {
        if (transcript) stop()
    }, [transcript])

    useEffect(() => {
        if (record) SpeechRecognition.startListening({ continuous: true, language: 'zh-TW' })
        else {
            SpeechRecognition.stopListening()
            resetTranscript()
        }
    }, [record])

    return { transcript, setRecord, listening }
}

export default useSpeech2Text
