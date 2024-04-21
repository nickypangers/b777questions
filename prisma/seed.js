import axios from 'axios';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  let data = [];

  await axios
    .get(
      'https://docs.google.com/forms/d/e/1FAIpQLSe4s9zMEqXFXKO9iJb8oisruMnp9opk1lZh9CKtDEYM11L87g/viewscore?viewscore=AE0zAgDfITqOSPRd9Vx4PEuobjLMdT5wG-kyLpWm7Ler3195wN61xCaMZdA3kDMnvX9TzFM'
    )
    .then(async (res) => {
      const $ = cheerio.load(res.data);
      $('div.o3Dpx[role=list]')
        .children('[role=listitem]')
        .each((i, el) => {
          let title = $('div[role=heading] > span', el).text().trim();

          let answerId = 0;

          let correctAnswer = null;

          let isAnswerAlreadyCorrect = false;

          if ($(el).has('div.D42QGf').length) {
            correctAnswer = $(
              'div.muwQbd > div > label > div > div.YEVVod > div > span',
              el
            )
              .text()
              .trim();
          }

          let options = $('div[jscontroller=eFy6Rc] > div > span > div', el)
            .children()
            .map((ii, cel) => {
              let hasCorrect = $('label', cel).has('div[aria-label=正確]');

              // console.log(ii, hasCorrect.length)

              if (hasCorrect.length) {
                isAnswerAlreadyCorrect = true;
                answerId = ii;
              }

              let q = $(
                'label > div.bzfPab.wFGF8 > div.YEVVod > div > span',
                cel
              )
                .text()
                .trim();
              return q;
            })
            .toArray();

          if (correctAnswer != null && isAnswerAlreadyCorrect == false) {
            answerId = options.findIndex((v) => v == correctAnswer);
          }

          data[i] = {
            title,
            options,
            answerId,
            correctAnswer,
            answerText: options[answerId]
          };
        });
    });

  let qs = await Promise.all(
    data.map(async (v) => {
      let q = await prisma.question.create({
        data: { text: v.title },
        select: {
          id: true,
          text: true,
          answer: true,
          answerId: true
        }
      });

      let options = await prisma.$transaction(
        v.options.map((o) =>
          prisma.option.create({ data: { text: o, questionId: q.id } })
        )
      );

      console.log('options', options);

      let answer = options.find((o) => o.text == v.answerText);
      console.log(q.id, answer);

      if (answer) {
        q = await prisma.question.update({
          where: {
            id: q.id
          },
          data: {
            answerId: answer.id
          },
          select: {
            id: true,
            text: true,
            answer: true,
            answerId: true
          }
        });
      }

      return q;
    })
  );

  // await prisma.user.create({
  //   data: {
  //     email: faker.internet.email(),
  //     username: faker.internet.userName(),
  //     password: '1234'
  //   }
  // });
}

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
