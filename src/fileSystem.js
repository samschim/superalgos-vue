// src/fileSystem.js

// A mock representation of a file system structure
export const fileSystem = [
  {
    id: 1,
    name: 'root',
    type: 'folder',
    children: [
      {
        id: 2,
        name: 'Documents',
        type: 'folder',
        children: [
          { id: 3, name: 'Resume.pdf', type: 'file' },
          { id: 4, name: 'CoverLetter.docx', type: 'file' }
        ]
      },
      {
        id: 5,
        name: 'Pictures',
        type: 'folder',
        children: [
          { id: 6, name: 'Vacation.jpg', type: 'file' },
          { id: 7, name: 'Family.png', type: 'file' }
        ]
      }
    ]
  }
];
