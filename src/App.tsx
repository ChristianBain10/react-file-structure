import { FC, useState } from 'react';
import './App.css';

type TItem = {
  filename: string;
  children?: TItem[];
}

const fileData: TItem[] = [
    { 
      filename: 'node_modules',
      children: [
        {
          filename: '.bin',
          children: [
            {
              filename: 'acorn'
            },
            {
              filename: 'browserlist'
            },
            {
              filename: 'esbuild'
            }
          ]
        },
        {
          filename: '.vite',
          children: [
            {
              filename: '_metadata.json'
            }
          ]
        }
      ]
    },
    {
      filename: 'src',
      children: [
        {
          filename: 'App.css'
        },
        {
          filename: 'App.tsx'
        }
      ]
    },
    {
      filename: '.gitignore'
    },
    {
      filename: 'package.json'
    }
];

interface IEntryProps { 
  entry: TItem;
  depth: number;
}

const Entry: FC<IEntryProps> = ({ entry, depth }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ paddingLeft: `${depth*5}px`}}>
      {entry.children
        ? <div className="folder" onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? "V" : ">" } {entry.filename}</div>
        : <div>- {entry.filename}</div>
      }
      {isExpanded && 
        <>
          {entry.children?.map((entry) => {
            return <Entry entry={entry} depth={depth + 2}/>
            })
          }
        </>
      }
    </div>
  )
}


function App() {
  const files = fileData;
  return (
    <div>
      {files.map((item: TItem) => {
        return <Entry entry={item} depth={0} />
      })
      }
    </div>
  )
}

export default App
