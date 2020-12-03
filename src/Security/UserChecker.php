<?php
namespace App\Security;

use App\Entity\User as AppUser;
use Symfony\Component\Security\Core\Exception\{CustomUserMessageAccountStatusException};
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserChecker implements UserCheckerInterface
{
    public function checkPreAuth(UserInterface $user)
    {
         
        if (!$user instanceof AppUser) {
            return;
        }
       
        if ( $user->getActivationCode() !== null ) {

           throw new CustomUserMessageAccountStatusException("Désolé, mais le compte n'est pas encore activé, verifié votre email et confirmer le code d'activation");
        }
    }

    public function checkPostAuth(UserInterface $user)
    {
          

        if (!$user instanceof AppUser) {
            return;
        }
    }
}
