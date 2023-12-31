import Catalog from "../../models/Menu.js";

class menuController {
    async getAll(req, res) {
        try {
            const catalogs = await Catalog.find()
            res.json(catalogs)
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req, res) {
        try {
            const catalog = await Catalog.findByIdAndDelete(req.params.id); // Найти ролл и удалить ролл
            if (!catalog) {
                return res.status(404).json({ message: "Меню с таким ID не был найден" });
            }
            return (
                res.json({ message: "Меню успешно удалено" })
        )
        } catch (e) {
            return res.status(500).json({ message: "Возникла ошибка при удалении меню" });
        }
    }

    async create(req, res) {
        try {
            const {img, title} = req.body
            const catalog = new Catalog({img, title})
            await catalog.save()
            return res.json('Меню был успешно сохранено')
        } catch (e) {
            res.status(400).json({message: "Меню с таким именем уже есть"})
        }
    }
    async findOne(req, res) {
        try {
            const id = req.params.id
            if (id === null) {
                return res.status(400).json({message: "Такого меню не существует"})
            }
            if (!id) {
                return res.status(400).json({message: "Вы не указали ID меню"})
            }
            const catalog = await Catalog.findById(id)
            res.json(catalog)
        } catch (e) {
            res.status(400).json({message: "Меню с указанным ID не был найден"})
        }
    }
}

export default new menuController()
