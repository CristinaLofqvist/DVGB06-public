# DVGB06-public
Unfortunatly i was not able to publish this project but to run it locally one will need a couple of things.
the following is needed to run this project:
    npm (good stuff to have)
    Node.js installed
    mongodb installed

then run the following replacing /Users/king/Development/Kau/DVGB06/project/database/db with the path to your mongodb:
    sudo mongod -port 27017 --dbpath /Users/king/Development/Kau/DVGB06/project/database/db

    in another shell lets add som products to the database:
        run:
            mongo
            then:
                use DVGB06DB
                db.products.insertMany([{"name" : "Tandpetare", "image" : "./Imagesmodified/IMG_6120.jpg", "imageAlt" : "Toothpick made from corn", "description" : "Dessa praktiska tandpetare är gjorda av majsstärkelse", "price" : 100, "qty" : 1000, "itemId" : 7 }
{"name" : "Nedbrytningsbara fryspåsar", "image" : "./Imagesmodified/IMG_6119.jpg", "imageAlt" : "degradable freezer bag", "description" : "Fantastiska påsar som går att kompostera", "price" : 50, "qty" : 1, "itemId" : 6 }
{"name" : "Zero waste tvål", "image" : "./Imagesmodified/annie-spratt-cxAZxTuL7Sk-unsplash.jpg", "imageAlt" : "Soap", "description" : "Härlig shampotvål som finns i flera färer och dofter", "price" : 200, "qty" : 0, "itemId" : 1 }
{"name" : "Påsklämmor", "image" : "./Imagesmodified/IMG_6121.jpg", "imageAlt" : "wire twists", "description" : "Plastfria påklämmor i gediget stål", "price" : 150, "qty" : 8, "itemId" : 3 }
{"name" : "Emaljerad tratt", "image" : "./Imagesmodified/IMG_6096.jpg", "imageAlt" : "funnel", "description" : "plastfri tratt", "price" : 250, "qty" : 7, "itemId" : 5 }
{"name" : "Tandborset i bambu", "image" : "./Imagesmodified/toothbrush.jpg", "imageAlt" : "funnel", "description" : "Runt 3,2 miljarder tandborstar i plast konsumeras varje år. Det är plast som är svårt att bryta ner och ofta i slutendan hamnar i sjöar och hav. Var med och ändra den trenden", "price" : 250, "qty" : 10, "itemId" : 2 }])
   
    in a new shell in the project root directiory run:
        node app

then in a browser preferably chrome go to localhost:3000

Enjoy!

