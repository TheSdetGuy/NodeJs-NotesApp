const fs=require('fs')
const chalk = require('chalk')

const getNotes = ()=> 
{
    return 'Your notes...'
}
//Adding new notes
const addNote= (title, body)=>
{
    const notes=loadNotes()
   
    const duplicateNotes=notes.filter((note)=>
        note.title===title
    )
  
    if(duplicateNotes.length===0)
    {
        notes.push(
            {
                title:title,
                body:body
            }
        )
        saveNotes(notes) 
        console.log('New note added!')
    }
    else
    console.log('Note title taken')
    
}
//Removing the note
const removeNote =(title) =>
{
    const notes=loadNotes()
    const notesToKeep = notes.filter((notes)=>
    
        notes.title!=title
    )
    if(notes.length!=notesToKeep)
    {
        console.log(chalk.green.inverse("Notes removed")),
        saveNotes(notesToKeep)
    }
    else
    console.log(chalk.red.inverse("No note found with the title!"))
  
}
//Listing all notes
const listNotes = () =>
{
    const notes=loadNotes()
    console.log(chalk.inverse('Your Notes'));
    notes.forEach(note => {
        console.log(chalk.green.inverse(note.title))
        console.log(note.body)
    });
}
const saveNotes = function(notes)
{
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}
const loadNotes= ()=>
{
    try 
    {

        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } 
    catch(e)
    {
        return []
    }
    
}
module.exports ={
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
}