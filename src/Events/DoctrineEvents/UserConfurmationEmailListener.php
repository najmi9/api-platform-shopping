<?php

namespace App\Events\DoctrineEvents;

use App\Entity\User;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;



class UserConfurmationEmailListener extends AbstractController
{
    // the entity listener methods receive two arguments:
    // the entity instance and the lifecycle event
     

     private $tokenGenerator, $mailer;

    function __construct(TokenGeneratorInterface $tokenGenerator, \Swift_Mailer $mailer)
    {
    	$this->tokenGenerator = $tokenGenerator;
    	$this->mailer = $mailer;
    }

    public function postPersist(User $user, LifecycleEventArgs $event)
    {       
           $code =$user->getActivationCode();
          
           $message =( new \Swift_Message("Confirmation de l'émail"))
                    ->setFrom('noreplynajmi@gmail.com')
                    ->setTo($user->getEmail())
                    ->setBody(
                            $this->renderView(                   
                            'emails/user_email.html.twig',
                            [
                              'user' => $user,
                              'code'=>$code
                            ]
                            )
                     , 'text/html');
            $this->mailer->send($message);
    }
}
