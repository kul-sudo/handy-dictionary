import Head from 'next/head'
import { Rubik } from '@next/font/google'
import { useAtom, atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)


const addWordToggleAtom = atom(false)
const deleteWordToggleAtom = atomWithStorage('deleteWordToggle', false)
const keyboardToggleAtom = atom(false)
const wordAtom = atom('')
const synonymAtom = atom('')
const meaningAtom = atom('')
const searchInputAtom = atom('')
const typedKeysAtom = atom('')

const rubik = Rubik({ subsets: ['latin'] })

const allKeys = {
  'Ա': 'ա',
  'Բ': 'բ',
  'Գ': 'գ',
  'Դ': 'դ',
  'Ե': 'ե',
  'Զ': 'զ',
  'Է': 'է',
  'Ը': 'ը',
  'Թ': 'թ',
  'Ժ': 'ժ',
  'Ի': 'ի',
  'Լ': 'լ',
  'Խ': 'խ',
  'Ծ': 'ծ',
  'Կ': 'կ',
  'Հ': 'հ',
  'Ձ': 'ձ',
  'Ղ': 'ղ',
  'Ճ': 'ճ',
  'Մ': 'մ',
  'Յ': 'յ',
  'Ն': 'ն',
  'Շ': 'շ',
  'Ո': 'ո',
  'Չ': 'չ',
  'Պ': 'պ',
  'Ջ': 'ջ',
  'Ռ': 'ռ',
  'Ս': 'ս',
  'Վ': 'վ',
  'Տ': 'տ',
  'Ր': 'ր',
  'Ց': 'ց',
  'Ւ': 'ւ',
  'Փ': 'փ',
  'Ք': 'ք',
  'Օ': 'օ',
  'Ֆ': 'ֆ',
  'ու': null,
  'և': null
}

const Center = ({ children }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>{children}</div>
  )
}

const checkIfContains = (word, contains) => {
  const lowerCaseContains = contains.toLowerCase()
 
  let word_ = Array.from(word)

  for (let i = 0; i <= 3; i++) {
    if (word_[i] === 'undefined') {
      word_[i] = ''
    }
  }

  if (word_[0].toLowerCase().includes(lowerCaseContains) || word_[1].toLowerCase().includes(lowerCaseContains) ||
  word_[2].toLowerCase().includes(lowerCaseContains)) {
    return true
  }
  return false
}

const Home = ({ data }) => {
  const [addWord, setAddWord] = useAtom(addWordToggleAtom)
  const [deleteWord, setDeleteWord] = useAtom(deleteWordToggleAtom)
  const [keyboardToggle, setKeyboardToggle] = useAtom(keyboardToggleAtom)

  const [wordTyped, setWord] = useAtom(wordAtom)
  const [synonymTyped, setSynonym] = useAtom(synonymAtom)
  const [meaningTyped, setMeaning] = useAtom(meaningAtom)
  const [searchInput, setSearchInput] = useAtom(searchInputAtom)
  const [typedKeys, setTypedKeys] = useAtom(typedKeysAtom)

  const handleWordChange = e => setWord(e.target.value)
  const handleSynonymChange = e => setSynonym(e.target.value)
  const handleMeaningChange = e => setMeaning(e.target.value)
  const handleSearchInputChange = e => setSearchInput(e.target.value)
  
  return (
    <>
      <Head>
        <title>Handy Dictionary</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center>
        <div className="text-[#fff] font-[600]">
          <p className={rubik.className}></p>
          <input onChange={handleSearchInputChange} placeholder="Type your word" className="mt-[2rem] bg-[#000] rounded-lg border-gray-800 border-[2.5px] px-[0.8rem] py-[0.5rem] focus-within:ring focus-within:ring-teal-500 outline-none ease-in-out duration-300" />
        </div>
      </Center>

      <Center>
        <div className="grid grid-cols-1 mt-7 gap-[3rem]">
          {Array.from(data).map(word => {
            word = [word.word, word.synonym, word.meaning]
            
            if (checkIfContains(word, searchInput)) {
              return (
                <div className="flex flex-col pb-5">
                  <Center>
                    <table className="table-fixed w-[50rem] text-left text-sm text-gray-400 font-medium">
                      <thead className="text-xs text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 font-medium">
                            Word
                          </th>
                          <th scope="col" className="px-6 py-3 font-medium">
                            Synonyms
                          </th>
                          <th scope="col" className="px-6 py-3 font-medium">
                            Meaning
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-[#0a0a0a] rounded-full">
                          <td className="px-6 py-4 text-white" style={{ wordWrap: 'break-word', hyphens: 'auto' }}>
                            {word[0]}
                          </td>
                          <td className="px-6 py-4 w-[50px]" style={{ wordWrap: 'break-word', hyphens: 'auto' }}>
                            {word[1]}
                          </td>
                          <td className="px-6 py-4 w-[50px]" style={{ wordWrap: 'break-word', hyphens: 'auto' }}>
                            {word[2]}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Center>

                  {deleteWord && (
                    <div className="bg-[#111] rounded-b-xl pb-2">
                      <Center>
                        <button className="mt-2 border-[1.5px] items-center p-3 rounded-lg border-zinc-800 bg-zinc-900 hover:bg-teal-900 hover:border-teal-600 ease-in-out duration-300" onClick={() => {
                          removeWord(word[0], word[1], word[2]).then(() => window.location.reload())
                        }}>
                          <Center>
                            <svg viewBox="0 0 24 24" className="flex-shrink-0 fill-[#fff] object-contain h-6 w-20"><path d="M19.452 7.5H4.547a.5.5 0 00-.5.545l1.287 14.136A2 2 0 007.326 24h9.347a2 2 0 001.992-1.819L19.95 8.045a.5.5 0 00-.129-.382.5.5 0 00-.369-.163zm-9.2 13a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zm5 0a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zM22 4h-4.75a.25.25 0 01-.25-.25V2.5A2.5 2.5 0 0014.5 0h-5A2.5 2.5 0 007 2.5v1.25a.25.25 0 01-.25.25H2a1 1 0 000 2h20a1 1 0 000-2zM9 3.75V2.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v1.25a.25.25 0 01-.25.25h-5.5A.25.25 0 019 3.75z"></path></svg>
                          </Center>
                        </button>
                      </Center>
                    </div>
                  )}
                </div>
              )
            }
          })}
        </div>
      </Center>

      <div className="fixed top-5 right-5 items-center">
        <div className="flex flex-col gap-2">
          <button className="border-[1.5px] items-center px-4 py-4 rounded-lg border-gray-800 bg-gray-900 hover:bg-teal-900 hover:border-teal-600 ease-in-out duration-300" onClick={() => {
            setAddWord(!addWord)
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="flex-shrink-0 fill-[#fff] object-contain h-6 w-6"><path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 15 10 L 15 15 L 10 15 L 10 17 L 15 17 L 15 22 L 17 22 L 17 17 L 22 17 L 22 15 L 17 15 L 17 10 Z"></path></svg>
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="fixed bottom-5">
          <button className="border-[1.5px] items-center px-4 py-4 rounded-lg border-gray-800 bg-gray-900 hover:bg-teal-900 hover:border-teal-600 ease-in-out duration-300" onClick={() => {
            setKeyboardToggle(!keyboardToggle)
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 fill-[#fff] object-contain h-6 w-6" viewBox="0 0 490 490">
              <g>
                <g>
                  <path d="M251.2,193.5v-53.7c0-5.8,4.7-10.5,10.5-10.5h119.4c21,0,38.1-17.1,38.1-38.1s-17.1-38.1-38.1-38.1H129.5    c-5.4,0-10.1,4.3-10.1,10.1c0,5.8,4.3,10.1,10.1,10.1h251.6c10.1,0,17.9,8.2,17.9,17.9c0,10.1-8.2,17.9-17.9,17.9H261.7    c-16.7,0-30.3,13.6-30.3,30.3v53.3H0v244.2h490V193.5H251.2z M232.2,221.5h15.6c5.4,0,10.1,4.3,10.1,10.1s-4.3,10.1-10.1,10.1    h-15.6c-5.4,0-10.1-4.3-10.1-10.1C222.1,225.8,226.7,221.5,232.2,221.5z M203.4,325.7h-15.6c-5.4,0-10.1-4.3-10.1-10.1    c0-5.4,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1C213.5,321,208.8,325.7,203.4,325.7z M213.5,352.9    c0,5.4-4.3,10.1-10.1,10.1h-15.6c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h15.6C208.8,342.8,213.5,347.5,213.5,352.9z     M203.4,288h-15.6c-5.4,0-10.1-4.3-10.1-10.1c0-5.8,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1    C213.5,283.7,208.8,288,203.4,288z M186.3,221.5h15.6c5.4,0,10.1,4.3,10.1,10.1s-4.3,10.1-10.1,10.1h-15.6    c-5.4,0-10.1-4.3-10.1-10.1S180.8,221.5,186.3,221.5z M140.4,221.5H156c5.4,0,10.1,4.3,10.1,10.1s-4.3,10.1-10.1,10.1h-15.6    c-5.4,0-10.1-4.3-10.1-10.1C130.3,225.8,134.9,221.5,140.4,221.5z M138.8,268.1h15.6c5.4,0,10.1,4.3,10.1,10.1    c0,5.8-4.3,10.1-10.1,10.1h-15.6c-5.4,0-10.1-4.3-10.1-10.1C128.7,272.4,133.4,268.1,138.8,268.1z M138.8,305.5h15.6    c5.4,0,10.1,4.3,10.1,10.1c0,5.4-4.3,10.1-10.1,10.1h-15.6c-5.4,0-10.1-4.3-10.1-10.1C128.7,310.1,133.4,305.5,138.8,305.5z     M138.8,342.8h15.6c5.4,0,10.1,4.3,10.1,10.1c0,5.4-4.3,10.1-10.1,10.1h-15.6c-5.4,0-10.1-4.3-10.1-10.1    C128.7,347.5,133.4,342.8,138.8,342.8z M94.5,221.5h15.6c5.4,0,10.1,4.3,10.1,10.1s-4.3,10.1-10.1,10.1H94.5    c-5.4,0-10.1-4.3-10.1-10.1S89.1,221.5,94.5,221.5z M89.4,268.1H105c5.4,0,10.1,4.3,10.1,10.1c0,5.8-4.3,10.1-10.1,10.1H89.4    c-5.4,0-10.1-4.3-10.1-10.1C79.3,272.4,84,268.1,89.4,268.1z M89.4,305.5H105c5.4,0,10.1,4.3,10.1,10.1c0,5.4-4.3,10.1-10.1,10.1    H89.4c-5.4,0-10.1-4.3-10.1-10.1C79.7,310.1,84,305.5,89.4,305.5z M89.4,342.8H105c5.4,0,10.1,4.3,10.1,10.1    c0,5.4-4.3,10.1-10.1,10.1H89.4c-5.4,0-10.1-4.3-10.1-10.1C79.7,347.5,84,342.8,89.4,342.8z M56,400.4H40.4    c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1H56c5.4,0,10.1,4.3,10.1,10.1C65.7,395.7,61.4,400.4,56,400.4z M56,363H40.4    c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1H56c5.4,0,10.1,4.3,10.1,10.1C65.7,358.4,61.4,363,56,363z M56,325.7H40.4    c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1H56c5.4,0,10.1,4.3,10.1,10.1C65.7,321,61.4,325.7,56,325.7z M56,288H40.4    c-5.4,0-10.1-4.3-10.1-10.1c0-5.8,4.3-10.1,10.1-10.1H56c5.4,0,10.1,4.3,10.1,10.1C66.1,283.7,61.4,288,56,288z M56,241.3H40.4    c-5.4,0-10.1-4.3-10.1-10.1s4.3-10.1,10.1-10.1H56c5.4,0,10.1,4.3,10.1,10.1S61.4,241.3,56,241.3z M252.8,400.4H89.4    c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h163.3c5.4,0,10.1,4.3,10.1,10.1C262.9,395.7,258.2,400.4,252.8,400.4z     M252.8,363h-15.6c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1    C262.9,358.4,258.2,363,252.8,363z M252.8,325.7h-15.6c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h15.6    c5.4,0,10.1,4.3,10.1,10.1C262.9,321,258.2,325.7,252.8,325.7z M252.8,288h-15.6c-5.4,0-10.1-4.3-10.1-10.1    c0-5.8,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1C262.9,283.7,258.2,288,252.8,288z M302.2,400.4h-15.6    c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1C311.9,395.7,307.6,400.4,302.2,400.4z     M302.2,363h-15.6c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1    C311.9,358.4,307.6,363,302.2,363z M302.2,325.7h-15.6c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h15.6    c5.4,0,10.1,4.3,10.1,10.1C311.9,321,307.6,325.7,302.2,325.7z M302.2,288h-15.6c-5.4,0-10.1-4.3-10.1-10.1    c0-5.8,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1C312.3,283.7,307.6,288,302.2,288z M312.3,241.3h-15.6    c-5.4,0-10.1-4.3-10.1-10.1s4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1S317.7,241.3,312.3,241.3z M351.2,400.4h-15.6    c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1C361.3,395.7,356.6,400.4,351.2,400.4z     M351.2,363h-15.6c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1    C361.3,358.4,356.6,363,351.2,363z M351.2,325.7h-15.6c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h15.6    c5.4,0,10.1,4.3,10.1,10.1C361.3,321,356.6,325.7,351.2,325.7z M351.2,288h-15.6c-5.4,0-10.1-4.3-10.1-10.1    c0-5.8,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1C361.3,283.7,356.6,288,351.2,288z M357.8,241.3h-15.6    c-5.4,0-10.1-4.3-10.1-10.1s4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1S363.6,241.3,357.8,241.3z M400.6,400.4H385    c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1C410.3,395.7,406,400.4,400.6,400.4z     M400.6,363H385c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1    C410.3,358.4,406,363,400.6,363z M400.6,325.7H385c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h15.6    c5.4,0,10.1,4.3,10.1,10.1C410.3,321,406,325.7,400.6,325.7z M400.6,288H385c-5.4,0-10.1-4.3-10.1-10.1c0-5.8,4.3-10.1,10.1-10.1    h15.6c5.4,0,10.1,4.3,10.1,10.1C410.7,283.7,406,288,400.6,288z M403.7,241.3h-15.6c-5.4,0-10.1-4.3-10.1-10.1s4.3-10.1,10.1-10.1    h15.6c5.4,0,10.1,4.3,10.1,10.1C413.8,237,409.5,241.3,403.7,241.3z M449.6,400.4H434c-5.4,0-10.1-4.3-10.1-10.1    c0-5.4,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1C459.7,395.7,455,400.4,449.6,400.4z M449.6,363H434    c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1C459.7,358.4,455,363,449.6,363z M449.6,325.7    H434c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1C459.7,321,455,325.7,449.6,325.7z     M449.6,288H434c-5.4,0-10.1-4.3-10.1-10.1c0-5.8,4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1    C459.7,283.7,455,288,449.6,288z M449.6,241.3H434c-5.4,0-10.1-4.3-10.1-10.1s4.3-10.1,10.1-10.1h15.6c5.4,0,10.1,4.3,10.1,10.1    S455,241.3,449.6,241.3z"/>
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>

      <div className="fixed top-[5.5rem] right-5 items-center">
        <div className="flex flex-col gap-2">
          <button className="border-[1.5px] items-center px-4 py-4 rounded-lg border-gray-800 bg-gray-900 hover:bg-teal-900 hover:border-teal-600 ease-in-out duration-300" onClick={() => {
            setDeleteWord(!deleteWord)
          }}>
            <svg viewBox="0 0 24 24" focusable="false" className="flex-shrink-0 fill-[#fff] object-contain h-6 w-6"><path d="M19.452 7.5H4.547a.5.5 0 00-.5.545l1.287 14.136A2 2 0 007.326 24h9.347a2 2 0 001.992-1.819L19.95 8.045a.5.5 0 00-.129-.382.5.5 0 00-.369-.163zm-9.2 13a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zm5 0a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zM22 4h-4.75a.25.25 0 01-.25-.25V2.5A2.5 2.5 0 0014.5 0h-5A2.5 2.5 0 007 2.5v1.25a.25.25 0 01-.25.25H2a1 1 0 000 2h20a1 1 0 000-2zM9 3.75V2.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v1.25a.25.25 0 01-.25.25h-5.5A.25.25 0 019 3.75z"></path></svg>
          </button>
        </div>
      </div>

      {keyboardToggle && (
        <div className="select-none p-5 rounded-xl bg-zinc-900 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <Center>
            <div className="gap-2 flex flex-row items-center">
              <input value={typedKeys} placeholder="Here is your text" disabled={true} className="text-white font-[600] w-[10rem] bg-[#111] placeholder:font-[600] rounded-lg border-gray-800 border-[2.5px] px-[0.8rem] py-[0.5rem] focus-within:ring focus-within:ring-teal-500 outline-none ease-in-out duration-300" />
              <div className="cursor-pointer" onClick={() => {
                navigator.clipboard.writeText(typedKeys)
              }}>
                <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi" className="w-5 h-5"><path fill="#fff" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg> 
              </div>
              <div className="cursor-pointer" onClick={() => {
                setTypedKeys(typedKeys.slice(0, -1))
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" version="1.1" id="Layer_1" viewBox="0 0 512 512" className="w-5 h-5">
                  <g>
                    <g>
                      <g>
                        <path d="M490.667,64H133.077c-7.196,0-13.906,3.627-17.848,9.647L3.485,244.314c-4.647,7.098-4.647,16.274,0,23.372     l111.744,170.667c3.942,6.02,10.652,9.647,17.848,9.647h357.589c11.782,0,21.333-9.551,21.333-21.333V85.333     C512,73.551,502.449,64,490.667,64z M469.333,405.333H144.609L46.833,256l97.776-149.333h324.725V405.333z"/>
                        <path d="M198.246,356.418c8.331,8.331,21.839,8.331,30.17,0l70.248-70.248l70.248,70.248c8.331,8.331,21.839,8.331,30.17,0     s8.331-21.839,0-30.17L328.834,256l70.248-70.248c8.331-8.331,8.331-21.839,0-30.17s-21.839-8.331-30.17,0l-70.248,70.248     l-70.248-70.248c-8.331-8.331-21.839-8.331-30.17,0c-8.331,8.331-8.331,21.839,0,30.17L268.495,256l-70.248,70.248     C189.915,334.58,189.915,348.087,198.246,356.418z"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <button onClick={() => setKeyboardToggle(false)}>
                <div className="fixed top-5 right-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="flex-shrink-0 fill-current object-contain h-6 w-6 text-gray-700 dark:text-gray-300">
                    <path
                      fill="currentColor"
                      d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
                      />
                  </svg>
                </div>
              </button>
            </div>
          </Center>
          
          <div className="mt-5 grid grid-cols-8 rounded-xl">
            {Object.keys(allKeys).map(key => (
              <button onClick={() => setTypedKeys(typedKeys + key)} className="w-[4rem] h-[4rem] text-white border-[1.5px] border-gray-800 bg-gray-900 hover:bg-teal-900 hover:border-teal-600 ease-in-out duration-200">
                <p>
                  {key}
                </p>
                <p className="text-gray-400">
                  {allKeys[key]}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {addWord && (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex justify-center items-center bg-zinc-900 w-[30rem] h-[25rem] rounded-xl border-[1px] border-[#fff] border-opacity-[0.16]">
            <Center>
              <button onClick={() => setAddWord(false)}>
                <div className="fixed top-5 right-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="flex-shrink-0 fill-current object-contain h-6 w-6 text-gray-700 dark:text-gray-300">
                    <path
                      fill="currentColor"
                      d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
                    />
                  </svg>
                </div>
              </button>
              <div className="flex justify-center flex-col gap-5">
                <div className="flex flex-col justify-center items-start gap-2">
                  <p className={rubik.className} style={{ color: 'white' }}>Word:</p>
                  <input onChange={handleWordChange} placeholder="Type your word" className="text-white font-[600] w-[10rem] bg-[#111] placeholder:font-[600] rounded-lg border-gray-800 border-[2.5px] px-[0.8rem] py-[0.5rem] focus-within:ring focus-within:ring-teal-500 outline-none ease-in-out duration-300" />
                </div>
                <div className="flex flex-col justify-center items-start gap-2">
                  <p className={rubik.className} style={{ color: 'white' }}>Synonyms:</p>
                  <input onChange={handleSynonymChange} placeholder="Type your word" className="text-white font-[600] w-[10rem] bg-[#111] placeholder:font-[600] rounded-lg border-gray-800 border-[2.5px] px-[0.8rem] py-[0.5rem] focus-within:ring focus-within:ring-teal-500 outline-none ease-in-out duration-300" />
                </div>
                <div className="flex flex-col justify-center items-start gap-2">
                  <p className={rubik.className} style={{ color: 'white' }}>Meaning:</p>
                  <input onChange={handleMeaningChange} placeholder="Type your word" className="text-white font-[600] w-[10rem] bg-[#111] rounded-lg border-gray-800 border-[2.5px] px-[0.8rem] py-[0.5rem] focus-within:ring focus-within:ring-teal-500 outline-none ease-in-out duration-300" />
                </div>
                <button className="text-white font-[600] border-[1.5px] items-center px-6 py-3 rounded-lg border-gray-800 bg-gray-900 hover:bg-teal-900 hover:border-teal-600 ease-in-out duration-500" onClick={() => {
                  let completeList = [wordTyped, synonymTyped, meaningTyped]
                  
                  for (let i = 0; i <= 3; i++) {
                    if (completeList[i] === '') {
                      completeList[i] = 'undefined'
                    }
                  }

                  if (wordTyped.length === 0) {
                    insertWord(...completeList).then(() => window.location.reload())
                  }

                  for (let element of data) {
                    if (JSON.stringify([element.word, element.synonym, element.meaning]) === JSON.stringify(completeList)) {
                      return
                    }
                  }

                  insertWord(...completeList).then(() => window.location.reload())
                  setTimeout(() => {
                    setAddWord(!addWord)
                  }, 50)
                }}>
                  Add word
                </button>
              </div>
            </Center>
          </div>
        </div>
      )}
    </>
  )
}

const insertWord = async (word, synonym, meaning) => {
  const { data } = await supabase
    .from('words')
    .insert({ word: word, synonym: synonym, meaning: meaning })
    .single()
}

const removeWord = async (word, synonym, meaning) => {
  const { data } = await supabase
    .from('words')
    .delete()
    .match({ word: word, synonym: synonym, meaning: meaning })
}

export async function getStaticProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const { data } = await supabase
    .from('words')
    .select()

  return {
    props: {
      data
    }
  }
}

export default Home
