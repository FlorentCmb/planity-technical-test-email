// Librairies
import { useState, useEffect, useRef } from 'react'
// JSON import
import JsonProviders from '../assets/providers.json'
// Style
import './EmailInput.css'

const EmailInput = () => {

    /* Ref */
    const inputRef = useRef(null)

    /* States */
    const [emailValue, setEmailValue] = useState('')
    const [providers, setProviders] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [popularSuggestions, setPopularSuggestions] = useState([])

    /* Lyfecycle */
    useEffect(() => {
        setProviders(JsonProviders)
        setPopularSuggestions(["gmail.com", "outlook.com", "yahoo.fr"])
        inputRef.current.focus()
    }, [])

    useEffect(() => {
        if (emailValue.includes('@') && !providers.includes(emailValue.split('@')[1])) getSuggestions(emailValue)
        else if (emailValue.length > 0 && !providers.includes(emailValue.split('@')[1])) setSuggestions(popularSuggestions)
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
                if (potentialSuggestions[i].indexOf(splittedValue) === 0) bestMatches.push(potentialSuggestions[i])
                else if (potentialSuggestions[i].indexOf(splittedValue) > 0) otherMatches.push(potentialSuggestions[i])
            }
    
            // The best suggestions are the best matches (sorted), followed by the other ones (sorted too)
            const bestSuggestions = bestMatches.sort().concat(otherMatches.sort())
            setSuggestions(bestSuggestions.slice(0, 3))
        }
    }

    // The function which will fill the input if we click on a suggestion
    const fillInputWithSuggestion = suggestion => {
        // This will fill the input with the suggestion and the @ if it's not already written
        const finalValue = emailValue.includes('@') ? emailValue.slice(0, emailValue.indexOf('@') + 1) + suggestion : emailValue + '@' + suggestion
        setEmailValue(finalValue)
        // This will give the focus back to the input
        inputRef.current.focus()
    }

    return (
        <div className="EmailInput">
            <label className="EmailInput-Label">Email :</label>
            <input id="EmailInput-Input" name="email" type="email" placeholder="Ex : jean.dupont@gmail.com" value={emailValue} onChange={inputHandler} ref={inputRef} />
            <ul className="EmailInput-List">{suggestions.length > 0 ? suggestions.map((suggestion, index) => (
                <li className="EmailInput-List-Item" onClick={() => fillInputWithSuggestion(suggestion)} key={index}>{suggestion}</li>
            )) : ""}
            </ul>
        </div>
    )
}

export default EmailInput