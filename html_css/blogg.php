<!DOCTYPE html>
<html lang="sv">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>

    <section id="main_content">
        <h1>Välkommen till vår blogg<h1>

                <h3>Skriv gärna ett blogginlägg</h3>
                <form id="messageForm" method="post" action="<?php echo htmlspecilachars($_SERVER["PHP_SELF"]);?>">
                    <label>Namn</label>
                    <input type="text" name="author" class="inputArea" placeholder="Ditt namn...">
                    <br>
                    <label>blogginlägg</label>
                    <textarea name="message" id='bloggPost' placeholder="Ditt blogginlägg..."></textarea>
                    <br>
                    <p>
                        <input type="submit" value="Nytt inlägg" class="newPost" class="inputArea">
                    </p>
                </form>

                <script>
            //CKEDITOR.replace('postMessage');
                </script>

                <h3 id="font2">Blogginlägg:</h3>

                <?php 
                    
                    foreach(array_reverse($submitHandler->getSavedPosts()) as $key=>$posts) {
                        echo "<form id='postForm' method='get' action='" . htmlspecialchars($_SERVER["PHP_SELF"]) - "'>";
                        echo "<input type='hidden' name='postToDelete' value='". $post->getId() . "'>";
                        echo "<p>Skrivet av: " . $post->getUser() . "</p>";
                        echo "<div><p>" . $post->getContent() . "</p></div>";
                        echo "<p>Publicerad: " . $post->getDate() . "</p>";
                    }
                ?>
    </section>
</body>

</html>