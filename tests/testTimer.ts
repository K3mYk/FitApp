import {TimerState, formatSeconds, getElapsedMs, getRemainingMs} from '../features/workout/timer'


const wait = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))

async function test(){
    const currentTime = Date.now()
    console.log(currentTime)

    await wait(1000)

    const endTime = Date.now()

    console.log(endTime)
}

async function libTest(){
    const curTime = Date.now()

    await wait(1000*2)

    const totalTime = getElapsedMs(curTime)
    console.log(formatSeconds(totalTime))
}

libTest()