import { useEffect, useState } from "react";
import React from 'react';


let keywordDict = {};

const LandingPage = () => {

    const[keyword, setKeyword] = useState('');
    const[keywordMxSeq, setKeywordMxSeq] = useState('');
    const plainLetter = "abcdefghijklmnopqrstuvwxyz".toUpperCase();

    const addKeyword = () =>{
        for(let i=0; i<keyword.length; i++){
            if(keywordDict[keyword[i]]){
                keywordDict[keyword[i]]++;
            }
            else{
                keywordDict[keyword[i]] = 1;
            }
        }
        generateKeywordMxSeq();
    }

    useEffect(()=>{
        document.title="Encipher";
    })
    
    const addSpaceBetweenLetters = (str) =>{
        let newStr = "";
        for(let i=0; i<str.length; i++){
            newStr = newStr +" "+ str[i] ;
        }
        return newStr;
    }
    const arrayToMsg = (arr) =>{
        let msg = "";
        for(let i=0;i<arr.length;i++){
            msg = msg + arr[i];
        }
        return msg;
    }

    const generateKeywordMxSeq = () =>{
        let generated = arrayToMsg(Object.keys(keywordDict));
        for(let i=0;i<plainLetter.length;i++){
            if(!(plainLetter[i] in keywordDict)){
                generated = generated + plainLetter[i];
            }
        }
        setKeywordMxSeq(generated);
    }

    const generateColumnarTrans = () =>{
        let reducedKey = arrayToMsg(Object.keys(keywordDict));
        let columnar = "";
        if(reducedKey.length>0){
            let lengthOfArr = Math.ceil(26/reducedKey.length);
            let arr = [];
            let j = reducedKey.length;
            let k = 0;
            for(let i=0;i<lengthOfArr-1;i++){
                arr.push(keywordMxSeq.substring(k,j));
                k = j;
                j = j + reducedKey.length;
            }
            arr.push(keywordMxSeq.substring(k, 26));

            for(let i=0;i<arr.length;i++){
                columnar = columnar + arrayToMsg(arr[i]) + "\n";
            }
            return columnar;
        }else{
           return 'Set Keyword';
        }
    }

    const generateTransSeq = () =>{
        let arr = generateColumnarTrans().split('\n');
        let str = "";
        let j = 0;
        while(j<Object.keys(keywordDict).length){
            for(let i=0; i<arr.length;i++){
                if(arr[i][j]){
                    str = str + arr[i][j];
                }else{
                    str = str + "";
                }
            }
            j++;
        }
        return addSpaceBetweenLetters(str);
        
    }

    return ( 
        <div className="LandingPage">
            <h1 className="Pg-title">Create Mixed Alphabet Cipher</h1>

            <div className="LandingPage-content">
                <label>Keyword: </label>
                <div className="add-keyword">
                    <input 
                        type="text"
                        required
                        value={keyword.toUpperCase()}
                        onChange={(e)=>(setKeyword(e.target.value.toUpperCase()))} 
                    />
                    <button onClick={addKeyword}>Set Keyword</button>
                </div>
                
                <label>Plain Letters: </label>
                <input 
                    type="text" 
                    value={addSpaceBetweenLetters(plainLetter)}
                    readOnly
                />

                <label>Keyword mixed sequence: </label>
                <input 
                    type="text" 
                    value={addSpaceBetweenLetters(keywordMxSeq)}
                    readOnly
                />
                <label>Columnar transposition: </label>
                <textarea rows="5"
                    type = "text"
                    value={addSpaceBetweenLetters(generateColumnarTrans())}
                    readOnly
                />

                <label>Transposed mixed sequence</label>
                <input 
                    type="text" 
                    value={generateTransSeq()}
                    readOnly
                />

            </div>
        </div>
     );
}
 
export default LandingPage;
