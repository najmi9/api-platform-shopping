<?php
namespace App\Security;

use App\Exception\AccountDeletedException;
use App\Security\User as AppUser;
use Symfony\Component\Security\Core\Exception\{CustomUserMessageAccountStatusException, BadCredentialsException};
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserChecker implements UserCheckerInterface
{
    public function checkPreAuth(UserInterface $user)
    {
         
        if (!$user instanceof AppUser) {
            return;
        }
        /**
         * Assurer que le compte est activé !
         */
        if ($user->getActivationCode()!==null) {
           throw new CustomUserMessageAccountStatusException("le compte n'est pas encore activé ");
        }
    }

    public function checkPostAuth(UserInterface $user)
    {
          

        if (!$user instanceof AppUser) {
            return;
        }
    }
}
