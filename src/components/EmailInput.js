// Librairies
import { useState, useEffect } from 'react'
// JSON import
import JsonProviders from '../assets/providers.json'
// Style
import './EmailInput.css'

const EmailInput = () => {

    /* States */
    const [emailValue, setEmailValue] = useState('')
    const [providers, setProviders] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [popularSuggestions, setPopularSuggestions] = useState([])

    /* Lyfecycle */
    useEffect(() => {
        setProviders(JsonProviders)
        setPopularSuggestions(["gmail.com", "outlook.com", "yahoo.fr"])
    }, [])

    useEffect(() => {
        if (emailValue.includes('@') && !providers.includes(emailValue.split('@')[1])) getSuggestions(emailValue)
        else if (emailValue.length > 0) setSuggestions(popularSuggestions)
        else setSuggestions([])
    }, [emailValue])
    
    /* Functions */
    const inputHandler = e => {
        setEmailValue(e.target.value)
    }

    // The function handling the suggestions
    const getSuggestions = value => {
        const splittedValue = value.split('@')[1]
        const potentialSuggestions = providers.filter(item => item.includes(splittedValue))

        if (potentialSuggestions.length > 0 && splittedValue.length > 0) {
            // These arrays will allow us to sort the matches by the index of the value following the @
            let bestMatches = []
            let otherMatches = []
            // We push the entries with the lowest index in the best matches
            for (let i = 0; i < potentialSuggestions.length; i++) {
                console.log(potentialSuggestions[i].indexOf(splittedValue))
                if (potentialSuggestions[i].indexOf(splittedValue) === 0) bestMatches.push(potentialSuggestions[i])
                else if (potentialSuggestions[i].indexOf(splittedValue) > 0) otherMatches.push(potentialSuggestions[i])
            }
    
            // The best suggestions are the best matches (sorted), followed by the other ones (sorted too)
            const bestSuggestions = bestMatches.sort().concat(otherMatches.sort())
            setSuggestions(bestSuggestions.slice(0, 3))
        }
        else {
            setSuggestions(popularSuggestions)
        }
    }

    return (
        <div className="EmailInput">
            <label className="EmailInput-Label">Email :</label>
            <input id="EmailInput-Input" name="email" type="email" placeholder="Ex : jean.dupont@gmail.com" value={emailValue} onChange={inputHandler} />
            <ul>{suggestions.length > 0 && !providers.includes(emailValue) ? suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
            )) : ""}
            </ul>
        </div>
    )
}

export default EmailInput