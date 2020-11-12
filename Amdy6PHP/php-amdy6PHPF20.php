<!DOCTYPE html>
<html lang="en">
    <head>
        <title>PHP Playground</title>
        <meta charset="utf-8">

        <!-- bootstrap -->
        <link rel="stylesheet" 
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" 
              integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" 
              crossorigin="anonymous">

        <!-- fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300&display=swap" rel="stylesheet">

        <!-- custom stylesheets -->
        <link rel="stylesheet" href="../styles/styles.css">
        <link rel="stylesheet" href="./styles-php-output.css">
    </head>
    <body class="test">
        <?php
            function checkIfLetters($stringInput){
                for ($i = 0; $i < strlen($stringInput); $i++){
                    $curCharacter = $stringInput[$i];
                    if(is_numeric($curCharacter)){
                        return -1;
                    }else if (preg_match('/[\'^£$%&*()}{@#~!?><>,|=_+¬-]/', $stringInput)){
                        return -1;
                    }
                }
                return 1;
            }

            // reference: https://www.w3resource.com/php-exercises/challenges/1/php-challenges-1-exercise-20.php
            function isHammingNumber($x){
                if ($x == 1){ return 1; }
                if ($x % 2 == 0){ return isHammingNumber($x/2); }
                if ($x % 3 == 0){ return isHammingNumber($x/3); }
                if ($x % 5 == 0){ return isHammingNumber($x/5); }	
                return 0;
            }

            function checkUsernameAndPassword($username, $password){
                $check = 0;
                if($username == "test-user" && $password == "test-password"){
                    $check = 1;
                }
                return $check;
            }

            function checkListCreatorInputs($charOne, $charTwo){
                if(strlen($charOne) != 1 || strlen($charTwo) != 1){
                    return -1;
                }
                return 1;
            }

            function checkCylinderSurfaceAreaInputs($radius, $height){
                if(is_numeric($radius) && is_numeric($height)){
                    return 1;
                }
                return -1;
            }


            // handling name function
            $firstName = $_GET[fname];
            $lastName = $_GET[lname];
            if($firstName && $lastName){
                $firstNameIsLetters = checkIfLetters($firstName);
                $lastNameIsLetters = checkIfLetters($lastName);
                if($firstNameIsLetters == 1 && $lastNameIsLetters == 1){
                    echo("Hello " . $firstName . " " . $lastName . ", welcome to my PHP playground, designed to 
                    simulate the value of server-side development and use in web development!");
                } else{
                    echo("Sorry but that is an invalid input, try again!");
                }
            }

            // handling hamming number function
            $hammingNumber = $_GET[quantity];
            if($hammingNumber){
                if(is_numeric($hammingNumber)){
                    if(isHammingNumber($hammingNumber) == 1){
                        echo("The provided number is a Hamming Number!");
                    } else{
                        echo("The provided number is not a Hamming Number!");
                    }
                } else{
                    echo("Sorry but that is an invalid input, try again!");
                }
            } 

            // handling username and password function
            $username = $_POST[username];
            $password = $_POST[password];
            if($username && $password){
                $UsernameAndPasswordIsValid = checkUsernameAndPassword($username, $password);
                if($UsernameAndPasswordIsValid == 1){
                    echo("Credentials validated with POST");
                } else{
                    echo("Username or password is incorrect");
                }
            }
  
            // handling list creator function
            $firstCharacter = $_GET[firstChar];
            $secondCharacter = $_GET[secondChar];
            if($firstCharacter && $secondCharacter){
                if(checkListCreatorInputs($firstCharacter, $secondCharacter) == 1){
                    if(ord($firstCharacter) <= ord($secondCharacter)){
                        echo("[");
                        for($i = ord($firstCharacter); $i <= ord($secondCharacter); $i++){
                            echo chr($i);
                            if($i < ord($secondCharacter)){
                                echo(", ");
                            }
                        }
                        echo("]");
                    } else{
                        echo("[");
                        for($i = ord($firstCharacter); $i >= ord($secondCharacter); $i--){
                            echo chr($i);
                            if($i > ord($secondCharacter)){
                                echo(", ");
                            }
                        }
                        echo("]");
                    }
                } else{
                    echo("Sorry but that is an invalid input, try again!");                   
                }
            }

            // handling cylinder surface area
            $cylinderRadius = $_GET[cylinderRadius];
            $cylinderHeight = $_GET[cylinderHeight];
            if($cylinderRadius && $cylinderHeight){
                if(checkCylinderSurfaceAreaInputs($cylinderRadius, $cylinderHeight) == 1){
                    $surfaceArea = (2*pi()*$cylinderRadius*$cylinderHeight + 2*pi()*(pow($cylinderRadius, 2)));
                    echo("The surface area of the cylinder is " . number_format($surfaceArea, 2));
                } else{
                    echo("Sorry but that is an invalid input, try again!");                   
                }
            }

            function checkForInput($firstName, $lastName, $hammingNumber, $username, $password, $firstCharacter, $secondCharacter, $cylinderRadius, $cylinderHeight){
                if(!(($firstName && $lastName) || $hammingNumber || ($username && $password) 
                      || ($firstCharacter && $secondCharacter) || ($cylinderRadius && $cylinderHeight))){
                    echo("Sorry but that is an invalid input, try again!");
                }
            }
            checkForInput($firstName, $lastName, $hammingNumber, $username, $password, $firstCharacter, $secondCharacter, $cylinderRadius, $cylinderHeight);
        ?>

    </body>
</html>