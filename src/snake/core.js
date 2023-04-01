// TODO: MAKE GAME PAUSE AT START AND END

    var gameLoop = function() {
        var canvas = document.getElementById("canvas");

        var ctx = canvas.getContext("2d");


        var width = canvas.width;

        var height = canvas.height;


        var blockSize = 25;

        var speed = 100;

        var widthInBlocks = width / blockSize;

        var heightInBlocks = height / blockSize;


        var score = 0;
        alert("Press OK to start.")

        var grid = function() {
            
            for (var x = blockSize; x < width; x += blockSize) {
                ctx.moveTo(x, blockSize);
                ctx.lineTo(x, height - blockSize);
            }

            for (var y = blockSize; y < height; y += blockSize) {
                ctx.moveTo(blockSize, y);
                ctx.lineTo(width - blockSize, y);
            }

            ctx.strokeStyle = "Grey";
            ctx.stroke();

        };


        var drawBorder = function() {
            ctx.fillStyle = "Transparent";
            ctx.fillRect(0, 0, width, blockSize);
            ctx.fillRect(0, height - blockSize, width, blockSize);
            ctx.fillRect(0, 0, blockSize, height);
            ctx.fillRect(width - blockSize, 0, blockSize, height);
            grid();
        };

        var drawScore = function() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "White";
            ctx.fillText(score, 5, 15);
        };


        var gameOver = function() {
            Snake.prototype.move = function(){};
            $("#over").text("GAME OVER!");
        };


        var circle = function(x, y, radius, fillCircle) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            if(fillCircle) {
                ctx.fill();
            } else {
                ctx.stroke();
            }
        };


        var Block = function(col, row) {
            this.col = col;
            this.row = row;
        };


        Block.prototype.drawSquare = function(color) {
            var x = this.col * blockSize;
            var y = this.row * blockSize;
            ctx.fillStyle = color;
            ctx.fillRect(x, y, blockSize, blockSize);
        };


        Block.prototype.drawCircle = function(color) {
            var centerX = this.col * blockSize + blockSize / 2;
            var centerY = this.row * blockSize + blockSize / 2;
            ctx.fillStyle = color;
            circle(centerX, centerY, blockSize / 2, true);
        };


        Block.prototype.equal = function(otherBlock) {
            return this.col === otherBlock.col && this.row === otherBlock.row;
        };


        var Snake = function() {
            this.segments = [
                new Block(7, 5),
                new Block(6, 5),
                new Block(5, 5),
            ];
            
            this.direction = "right";
            this.nextDirection = "right";
        };


    Snake.prototype.draw = function() {

        for(var i = 0; i < this.segments.length; i++) {
            this.segments[i].drawSquare("White")
        }

    };

        Snake.prototype.move = function() {

                var head = this.segments[0];
                var newHead;

                this.direction = this.nextDirection;

                if(this.direction === "right") {
                    newHead = new Block(head.col + 1, head.row);
                } else if(this.direction === "down") {
                    newHead = new Block(head.col, head.row + 1);
                } else if(this.direction === "left") {
                    newHead = new Block(head.col - 1, head.row);
                } else if(this.direction === "up") {
                    newHead = new Block(head.col, head.row - 1);
                }

                if(this.checkCollision(newHead)) {
                    gameOver();
                    return;
                }

                this.segments.unshift(newHead);

                if(newHead.equal(apple.position)) {
                    score++;
                    apple.move();
                } else {
                    this.segments.pop();
                }
            
        };


        Snake.prototype.checkCollision = function(head) {
            var leftCollision = (head.col === 0);
            var topCollision = (head.row === 0);
            var rightCollision = (head.col === widthInBlocks - 1);
            var bottomCollision = (head.row === heightInBlocks - 1);

            var wallCollision = leftCollision || topCollision || 
            rightCollision || bottomCollision;

            var selfCollision = false;

            for(var i = 0; i < this.segments.length; i++) {
                if(head.equal(this.segments[i])) {
                    selfCollision = true;
                }
            }

            return wallCollision || selfCollision;
        };

        Snake.prototype.setDirection = function(newDirection) {
            if(this.direction === "up" && newDirection === "down") {
                return;
            } else if(this.direction === "right" && newDirection === "left") {
                return;
            } else if(this.direction === "down" && newDirection === "up") {
                return;
            } else if(this.direction === "left" && newDirection === "right") {
                return;
            }

            this.nextDirection = newDirection;
        };


        var Apple = function() {
            var rStartCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
            var rStartRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
            this.position = new Block(rStartCol, rStartRow);
        };


        Apple.prototype.draw = function() {
            this.position.drawCircle("White");
        };


        Apple.prototype.move = function() {
            var randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
            var randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
            this.position = new Block(randomCol, randomRow);
            if(snake.position === apple.position) {
                apple.move()
                apple.draw()
            }
        };


        var snake = new Snake();
        var apple = new Apple();

        var intervalId = setInterval(function() {
            ctx.clearRect(0, 0, width, height);
            drawScore();
            snake.move();
            snake.draw();
            apple.draw();
            grid();
        }, speed);


        var directions = {
            65: "left",
            87: "up",
            68: "right",
            83: "down",
            37: "left",
            38: "up",
            39: "right",
            40: "down"
        };


        $("body").keydown(function(event) {
            var newDirection = directions[event.keyCode];
            if(newDirection !== undefined) {
                snake.setDirection(newDirection);
            }
        });

    };

    gameLoop();