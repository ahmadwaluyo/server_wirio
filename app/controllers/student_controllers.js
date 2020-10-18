const StudentSchema = require('../schemas/student_schemas');
const models = require('../models/index');
const { errorMessage, successMessage, status } = require('../helpers/status');
const ErrorResponse = require('../helpers/errorResponse');

class StudentControllers {
  static async addStudent(req, res, next) {
    const body = req.body;

    let payload = {
      nama: body.nama,
      alamat: body.alamat,
      kelas: body.kelas,
      nama_wali: body.nama_wali,
      no_telp_wali: body.no_telp_wali,
      rekap_nilai: body.rekap_nilai,
      rekap_pembayaran: body.rekap_pembayaran,
    };

    try {
      const validation = await StudentSchema.validateAsync(body);
      console.log(validation);
      const data = await models.td_student.create(payload);
      successMessage.status = 201;
      successMessage.content = data;
      res.status(status.created).json(successMessage);
    } catch (error) {
      console.error(error);
      let code;
      if (error.name === "ValidationError") {
        errorMessage.status = status.bad;
        errorMessage.message = error.message;
        code = status.bad;
      } else {
        errorMessage.status = status.error;
        errorMessage.message = error.message;
        code = status.error;
      }
      res.status(code).json(errorMessage);
    }
  }

  static async getStudents(_, res) {
    try {
      const data = await models.td_student.findAll({});
      successMessage.content = data;
      res.status(status.success).json(successMessage);
    } catch (error) {
      console.error(error.message);
      errorMessage.message = error.message;
      res.status(status.error).json(errorMessage);
    }
  }

  static async getStudentById(req, res, next) {
    const { id } = req.params;

    try {
      const data = await models.td_student.findAll({
        where: { id }
      });

      if (data.length === 0) return next(new ErrorResponse(`Resource with id ${id} not found`, status.notFound));

      successMessage.content = data[0];
      res.status(status.success).json(successMessage);
    } catch (error) {
      console.error(error.message);
      errorMessage.message = error.message;
      res.status(status.error).json(errorMessage);
    }
  }

  static async updateStudent(req, res, next) {
    const { id } = req.params;
    try {
      const validation = await StudentSchema.validateAsync(req.body);
      console.log(validation);

      const checkData = await models.td_student.findAll({
        where: { id },
      });

      if (checkData.length === 0) return next(new ErrorResponse(`Resource with id ${id} not found`, status.notFound));

      const data = await models.td_student.update(req.body, {
        where: { id },
        returning: true,
      });
      successMessage.content = data[1][0];
      res.status(status.success).json(successMessage);
    } catch (error) {
      console.error(error);
      let code;
      if (error.name === "ValidationError") {
        errorMessage.status = status.bad;
        errorMessage.message = error.message;
        code = status.bad;
      } else {
        errorMessage.status = status.error;
        errorMessage.message = error.message;
        code = status.error;
      }
      res.status(code).json(errorMessage);
    }
  }

  static async deleteStudent(req, res, next) {
    const { id } = req.params;
    try {
      const checkData = await models.td_student.findAll({
        where: { id },
      });

      if (checkData.length === 0) return next(new ErrorResponse(`Resource with id ${id} not found`, status.notFound));

      await models.td_student.destroy({
        where: { id },
      });

      successMessage.content = { message: 'Resource has been deleted' };
      res.status(status.success).json(successMessage);
    } catch (error) {
      console.error(error);
      let code;
      if (error.name === "ValidationError") {
        errorMessage.status = status.bad;
        errorMessage.message = error.message;
        code = status.bad;
      } else {
        errorMessage.status = status.error;
        errorMessage.message = error.message;
        code = status.error;
      }
      res.status(code).json(errorMessage);
    }
  }

}

module.exports = StudentControllers