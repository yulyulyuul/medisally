const express = require("express");
const cors = require("cors");
const models = require("./models");
const dayjs = require("dayjs");
const { Op } = require("sequelize");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  q;
  res.send("Hello World!");
});

//증상 기록 업로드하기
app.post("/symptoms", (req, res) => {
  const body = req.body;
  const {
    time,
    importance,
    symptomType,
    fiveScale,
    numbScale,
    scaleType,
    memo,
    voice,
    video,
    photo,
  } = body;
  if (!time || !importance || !symptomType || !scaleType) {
    res.status(400).send("필수 입력 항목을 입력하지 않음");
  }
  models.Symptom.create({
    time,
    importance,
    symptomType,
    fiveScale,
    numbScale,
    scaleType,
    memo,
    voice,
    video,
    photo,
  })
    .then((result) => {
      console.log("증상 기록 생성 결과 :", result);
      res.send({
        result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("증상 기록 업로드에 문제가 발생했습니다.");
    });
});

//증상 종류별 증상 기록 모두 불러오기
app.get("/symptomsByType", (req, res) => {
  const symptomType = req.query.symptomType;
  models.Symptom.findAll({
    where: {
      symptomType: symptomType,
    },
  })
    .then((result) => {
      res.send({
        symptoms: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("증상 종류별 증상 기록 조회에 에러 발생");
    });
});

//날짜별 증상 기록 모두 불러오기
app.get("/symptomsByDate", (req, res) => {
  const time = dayjs(req.query.time).format("YYYY-MM-DD");
  console.log(time);
  const startTime = new Date(String(time));
  console.log(startTime);
  const endTime = new Date(String(time) + " 23:59:59");
  console.log(endTime);
  console.log(dayjs(endTime).isValid());
  console.log(dayjs(startTime).isValid());
  models.Symptom.findAll({
    where: {
      [Op.or]: [
        { time: { [Op.between]: [startTime, endTime] } },
        { time: startTime },
      ],
    },
  })
    .then((result) => {
      res.send({
        symptoms: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("날짜별 증상 기록 조회에 에러 발생");
    });
});

//복약/처치 기록 업로드하기
app.post("/treats", (req, res) => {
  const body = req.body;
  const {
    time,
    importance,
    symptomType,
    treatType,
    effect,
    memo,
    voice,
    video,
    photo,
  } = body;
  if (!time || !importance || !symptomType || !treatType) {
    res.status(400).send("필수 입력 항목을 입력하지 않음");
  }
  models.Treat.create({
    time,
    importance,
    symptomType,
    treatType,
    memo,
    voice,
    video,
    photo,
  })
    .then((result) => {
      console.log("복약/처치 기록 생성 결과 :", result);
      res.send({
        result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("복약/처치 기록 업로드에 문제가 발생했습니다.");
    });
});

//증상 종류별 복약/처치 기록 모두 조회하기
app.get("/treats", (req, res) => {
  const symptomType = req.query.symptomType;
  models.Treat.findAll({
    where: {
      symptomType: symptomType,
    },
  })
    .then((result) => {
      res.send({
        treats: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("증상 종류별 복약/처치 기록 조회에 에러 발생");
    });
});

//날짜별 복약/처치 기록 모두 불러오기
app.get("/treatsByDate", (req, res) => {
  const time = dayjs(req.query.time).format("YYYY-MM-DD");
  console.log(time);
  const startTime = new Date(String(time));
  console.log(startTime);
  const endTime = new Date(String(time) + " 23:59:59");
  console.log(endTime);
  models.Treat.findAll({
    where: {
      [Op.or]: [
        { time: { [Op.between]: [startTime, endTime] } },
        { time: startTime },
      ],
    },
  })
    .then((result) => {
      res.send({
        treats: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("날짜별 복약/처치 기록 조회에 에러 발생");
    });
});

//유저 정보 등록
app.post("/user", (req, res) => {
  const body = req.body;
  const { nickname, desigSex, birthDate } = body;
  if (!time || !importance || !symptomType || !treatType) {
    res.status(400).send("필수 입력 항목을 입력하지 않음");
  }
  models.User.create({
    nickname,
    desigSex,
    birthDate,
  })
    .then((result) => {
      console.log("유저 생성 결과 :", result);
      res.send({
        result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("유저 생성에 문제가 발생했습니다.");
    });
});

//유저 정보 가져오기
app.get("/user", (req, res) => {
  const UUID = req.query.UUID;
  models.User.findOne({
    where: {
      UUID: UUID,
    },
  })
    .then((result) => {
      res.send({
        user: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("유저 조회에 에러 발생");
    });
});

app.listen(port, () => {
  console.log(`medisally server listening on port ${port}`);
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공");
    })
    .catch((err) => {
      console.error(err);
      console.log("DB 연결 에러");
      process.exit();
    });
});
