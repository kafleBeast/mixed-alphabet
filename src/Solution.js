import { useEffect, useState } from "react";
import React from 'react';
import Histogram from 'react-chart-histogram';
import freqFirstAndLast from './images/frequencyFandL.png';
import monoFrequency from './images/monofrequency.png';


let encodedArray = [];
let correspondenceDict = {};
let correspondence = "";
let updatePosition = {};

const Solution = () => {

    const[cipher, setCipher] = useState('');
    const[plainLetter, setPlainLetter] = useState('');
    const[cipherLetter, setCipherLetter] = useState('');
    const options = { fillColor: '#2f73c0', strokeColor: '#02g0FF',  };


    const updateCipher = () =>{
        for(let i=0;i<cipher.length;i++){
            encodedArray.push(cipher[i]);
        }
    }

    const arrayToMsg = (arr) =>{
        let msg = "";
        for(let i=0;i<arr.length;i++){
            msg = msg + arr[i];
        }
        return msg;
    }

    const updateCorrespondence = () =>{
        let cip = Object.keys(correspondenceDict);
        let temp = ""
        for(let i=0; i<cip.length;i++){
            temp = cip[i] + " : " + correspondenceDict[cip[i]] + ", ";
        }
        correspondence = correspondence + temp;
    }

    const addCorrespondence = () =>{
        if(cipherLetter !== '' && plainLetter !== ''){
            if(!correspondenceDict[cipherLetter]){
                correspondenceDict[cipherLetter] = plainLetter;
            }
        }
        for(let i=0; i<encodedArray.length; i++){
            if(encodedArray[i] === cipherLetter && !(i in updatePosition)){
                encodedArray[i] = plainLetter;
                updatePosition[i] = 1;
            }
        }
        updateCorrespondence();
        setCipherLetter('');
        setPlainLetter('');
    }

    const getFrequency = (string) =>{   
        let freq = {};
        for (let i=0; i<string.length;i++) {
            let character = string.charAt(i);
            if(character!==" "){
                if (freq[character]) {
                    freq[character]++;
                } else {
                    freq[character] = 1;
                }
            }
        }    
        return freq;
    };

    let alphaFreq = getFrequency(cipher);

    useEffect(()=>{
        document.title="Decipher";
    })

    return ( 
        <div className="Solution">
            <h1 className="solution-title">Solutions to mixed Alphabet</h1>

            <div className="solution-content">
                <label>Cipher: </label>
                <textarea rows="5"
                    type="text" 
                    placeholder="Encoded message"
                    value={cipher}
                    onChange={(e) => setCipher(e.target.value.toUpperCase())}
                />
                <button className="addCode-btn" onClick={updateCipher}>Add code</button>

                <h3 className="header-images">Frequency reference: </h3>                
                <div className="reference-images">
                    <img src={freqFirstAndLast} id="img1" alt="Frequent First and Last letters" />
                    <img src={monoFrequency} id="img2" alt="Frequent letters" />
                </div>

                <h3 className="header-histogram">Frequency distribution: </h3>                
                <div className="histogram">
                    <Histogram
                        xLabels={Object.keys(alphaFreq)}
                        yValues={Object.values(alphaFreq)}
                        width='500'
                        height='400'
                        options={options}
                    />
                </div>

                <label>Deciphered Message: </label>
                <textarea rows="5"
                    type="text" 
                    value={arrayToMsg(encodedArray)}
                    readOnly
                />

                <label>Add Plain-Cipher Equivalents: </label>
                <div className="add-equivalents">
                    <input
                        type="text" 
                        placeholder='Cipher'
                        value={cipherLetter}
                        onChange={(e)=>(setCipherLetter(e.target.value.toUpperCase()))}
                    />
                    <input 
                        type="text" 
                        placeholder='Plain'
                        value={plainLetter}
                        onChange={(e)=>setPlainLetter(e.target.value.toUpperCase())}
                    />
                    <button onClick={addCorrespondence}>Add</button>
                </div>

                <label>Plain-Cipher Equivalents</label>
                <textarea rows="3" 
                    type="text"
                    value = {correspondence}
                    readOnly
                />
                
            </div>

        </div>
     );
}
 
export default Solution;