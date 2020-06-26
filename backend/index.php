<?php 
/*********************************************************************
 * Gästbok med objektorienterad PHP
 * Written by Cristina Löfqvist/ Mid Swewden University in Feb-2020.
 *********************************************************************/
/* Laddar alla klasser */
include("configue.php");
include('SubmitHandler.php');
$submitHandler = new SubmitHandler();
$submitHandler->handleSubmit();

include("header.php"); 
?>
<section id="maincontent">
    <div id="adjusth1">
        <h1>Välkomen vår blogg<h1>
                <div>
                    <div id="adjustcontent">
                        <h3>Skriv gärna ett blogginlägg</h3>
                        <form id="messageForm" method="post"
                            action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
                            <label>Namn</label>
                            <input type="text" name="author" class="inputArea" placeholder="Ditt namn...">
                            <br>
                            <label>blogginlägg</label>
                            <textarea name="message" id='postMessage' placeholder="Ditt meddelande..."></textarea>
                            <br>
                            <p>
                                <input type="submit" value="Nytt inlägg" class="newPost" class="inputArea">
                            </p>
                        </form>
                        <script>
                        //CKEDITOR.replace('postMessage');
                        </script>
                        <a href="post.CSV" target="_blank">Visa data</a>
                        <h3 id="font2">Gästboksinlägg:</h3>

                        <?php
                            
                            foreach(array_reverse($submitHandler->getSavedPosts()) as $key=>$post) {
                                echo "<form id='postForm' method='get' action='" . htmlspecialchars($_SERVER["PHP_SELF"]) . "'>";
                                echo "<input type='hidden' name='postToDelete' value='". $post->getId() . "'>";
                                echo "<p>Skrivet av: " . $post->getUser() . "</p>"; 
                                echo "<div><p>" . $post->getContent() . "</p></div>";
                                echo "<p>Publicerad: " . $post->getDate() . "</p>";
                            }
                        ?>
                    </div>
                </div>
    </div>
    <!--end of adjust content div-->
</section>
<?php include("footer.php"); ?>

</body>

</html>