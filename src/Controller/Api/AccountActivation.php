<?php

namespace App\Controller\Api;

use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Form\ResetPasswordType;
use App\Entity\User;


class AccountActivation extends AbstractController
{
    /**
     * Route(path="/users/email/confirmation/{token}", name="confirmation_email", methods={"GET"})
     */
    public function __invoke(User $data)
    {
           if ($data) {
               $data->setActivationToken(null);
           }
         dd($data);
         return $data;
    }
}