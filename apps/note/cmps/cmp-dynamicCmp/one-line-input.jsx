

export function OneLineInput({getOptions,toggleFocus,handleChange,text,onAddNote}){

    return <form className="note-add" onSubmit={getOptions}>
                <label htmlFor="note-google">   </label>
                <input
                    className="input-note"
                    type="text"
                    onClick={toggleFocus}
                    placeholder="Add note"
                    id="note-google"
                    name="text"
                    value={text}
                    onChange={handleChange}

                />

                <span onClick={onAddNote} name="img" className="fa foto"></span>
            </form>

}