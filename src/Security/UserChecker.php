<?php
namespace App\Security;

use App\Security\User as AppUser;
use Symfony\Component\Security\Core\Exception\AccountExpiredException;
use Symfony\Component\Security\Core\CustomUserMessageAccountStatusException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserChecker implements UserCheckerInterface
{
    public function checkPreAuth(UserInterface $user)
    {

        /*  throw new CustomUserMessageAccountStatusException("votre n'est pas activé vérifier votre email et l'activer !");

        if (!$user instanceof AppUser) {
            return;
        }

        if ($user->getActivationCode() !== null) {
            throw new CustomUserMessageAccountStatusException("votre n'est pas activé vérifier votre email et l'activer !");
        }*/
    }

    public function checkPostAuth(UserInterface $user)
    {
        if (!$user instanceof AppUser) {
            return;
        }
    }
}
