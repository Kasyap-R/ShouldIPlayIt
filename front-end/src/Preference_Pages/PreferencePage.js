import "./PreferencePage.css";
import NextArrow from "./NextArrow";
import Choice from "./Choice";


export default function PreferencePage(props) {
    const motivationChoices = [
        // ADD THIRD ELEMENT TO EACH ARRAY HERE
        ['Destruction', 'I love guns, explosives, and CHAOS.', 'Destruction'],
        ['Excitement', 'I want something fast-paced, full of thrills and surprises.', 'Excitement'],
        ['Competition is the only reason to exist', ' I am literally incapable of having fun if I don\'t win, it\'s a problem...', 'Competition'],
        ['Social Butterfly', 'I\'m all about being in a group and having fun with others.', 'Community'],
        ['Test me', 'I really enjoy facing difficult challenges that take lots of time/mastery to pass.', 'Challenge'],
        ['Grand Strategist', 'Like the gods on Mount Olympus, I look ahead to see the end of all things.', 'Strategy'],
        ['Completionist', 'No collectible left unfound. No achievement incomplete. Not a single gamemode left untouched.', 'Completion'],
        ['Power Hungry', 'I live to level up, to be better, to do more.', 'Power'],
        ['Escapist', 'Reality is often disappointing. I wish to be someone else, somewhere else.', 'Fantasy'],
        ['Plot Fiend', 'I love deep storylines and interesting characters. Games are my preferred medium to experience a narrative.', 'Story'],
        ['Customizer', 'I like to express myself through games, whether it be character customization or building an beautiful house.', 'Design'],
        ['Explorer', 'I like to explore the game world and all it\'s mechanics, I impulsively look at everything I come across.', 'Discovery']
    ];

    return (
        <>
            <h1>Which of the following describe you?</h1>
            <div className="choices-container">
                {motivationChoices.map((choice, index) => {
                    return(
                        <Choice key={index} choice={choice} handlePreferences={props.handlePreferences} preferences={props.preferences}/>
                    )
                })}         
            </div>
            <NextArrow showCondition={props.preferences.length > 0} onClick={props.nextPage}/>
        </>
    )
}   