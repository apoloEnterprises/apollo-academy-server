import { Request, Response } from 'express';

class userController {
  async index (req: Request, res: Response) {
    const {
      categoria, opt1 
    } = await req.body;


    const tech = {
      linguagens: ['Javascript', 'Typerscript', 'C#'],
      conteudo: 'Primeiro programa em JS',
      frontEnd: 'ReactJS'
    }

    const design = [
     { 'Ferramentas': ['Figma', 'Photoshop', 'Adobe Xd']},
      {'Areas': ['Web design', 'Mobile design', 'Social media', 'Photos']},
      {'Principios': ['Cores', 'Fonte', 'Alinhamentos']}
    ]

    const game = [
     { 'Ferramentas': ['Adobe Unity', 'Blender']},
      {'Linguagens': ['Java', 'C#', 'C']},
      {'Area': ['Mobile Games', 'Desktop']}
    ];


    if(categoria) {
      switch (categoria) {
        case 'tech': 
        res.send(`categoria tech: ${categoria}, ${tech.frontEnd}`)
        break;
        case 'design': 
        res.send(`categoria desigh: ${categoria}`)
        break;
        case 'game': 
        res.send(`categoria game: ${categoria}`)
        break;
        default: 
        console.log('idk man');
      }
      
      // if (opt1 == tech.linguagens[0])  {
      //   res.status(200).send(`${tech.conteudo}`)
      // } else {
      //   console.log(tech.linguagens[0]);
      // }
    }

  }
}

module.exports = new userController();
