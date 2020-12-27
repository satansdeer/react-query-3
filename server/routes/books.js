const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const idlength = 8;

const DELAY = 1000;

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Book:
 *        type: object
 *        required:
 *          - title
 *          - author
 *          - finished
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the book.
 *          title:
 *            type: string
 *            description: The title of the book.
 *          author:
 *            type: string
 *            description: Who wrote the book?
 *        example:
 *           id: d5fE_asz
 *           title: The New Turing Omnibus
 *           author: Alexander K. Dewdney
 */

/**
 *  @swagger
 *  tags:
 *    name: Books
 *    description: API to manage the books in the library.
 */

/**
 *  @swagger
 *  /books:
 *    get:
 *      summary: Lists all the books
 *      tags: [Books]
 *      responses:
 *        200:
 *          description: The list of all books.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Book'
 */
router.get("/", (req, res) => {
	const books = req.app.db.get("books");

  setTimeout(() => {
    res.send(books)
  }, DELAY)
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book not found.
 */
router.get("/:id", (req, res) => {
	const book = req.app.db.get("books").find({ id: req.params.id }).value();

  setTimeout(() => {
	  res.send(book);
  }, DELAY)
});

/**
 *  @swagger
 *  /books:
 *    post:
 *      summary: Create a new book
 *      tags: [Books]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      responses:
 *        200:
 *          description: The created book
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Book'
 *        500:
 *          description: Server error
 */
router.post("/", (req, res) => {
	try {
		const book = {
			id: nanoid(idlength),
			...req.body,
		};
		req.app.db.get("books").push(book).write();

    setTimeout(() => {
	   res.send(book);
    }, DELAY)
	} catch (error) {
		return res.status(500).send(error);
	}
});

/**
 *  @swagger
 *  /books/{id}:
 *    put:
 *      summary: Update the book by id
 *      tags: [Books]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The book id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      responses:
 *        200:
 *          description: The updated book
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Book'
 *        404:
 *          description: The book not found
 *        500:
 *          description: Server error
 */
router.put("/:id", (req, res) => {
	try {
		req.app.db.get("books").find({ id: req.params.id }).assign(req.body).write();

		setTimeout(() => {
      res.send(req.app.db.get("books").find({ id: req.params.id }));
    }, DELAY)
	} catch (e) {
		return res.status(500).send(e);
	}
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book not found.
 */
router.delete("/:id", (req, res) => {
	req.app.db.get("books").remove({ id: req.params.id }).write();

  setTimeout(() => {
	  res.sendStatus(200);
  }, DELAY)
});

module.exports = router;
