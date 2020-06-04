const fs=require('fs')
const chalk = require('chalk')

//Adding new notes
const addNote= (title, body)=>
{
    const notes=loadNotes()
    const duplicateNote = notes.find((note)=>
    note.title===title)
    if(!duplicateNote)
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
        
    });
}

//Reading Notes
const readNote =(title)=>
{
    const notes=loadNotes()
    const note=notes.find((note)=> notes.title===title)
    if(note)
    {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else
    {
        console.log(chalk.red.inverse("Note Not Found"))
    }
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
  
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote,
}