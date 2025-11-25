<?php

if(mail('mail@johannes-weachter.de', 'Test', 'Hallo', 'From: noreply@mywebsite.de')) {
    echo "Mail verschickt";
} else {
    echo "Mail fehlgeschlagen";
}
?>
