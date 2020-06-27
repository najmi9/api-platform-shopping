<?php

namespace App\Events\UserSecurityEvents;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;
use ApiPlatform\Core\Validator\ValidatorInterface;


final class ActivationSubscriber implements EventSubscriberInterface
{
    
    private $userRepo, $em;
    private $validator;

    public function __construct(EntityManagerInterface $em, UserRepository $userRepo, ValidatorInterface $validator)
    {
        $this->em = $em;
        $this->userRepo = $userRepo;
        $this->validator = $validator;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['activateAccount', EventPriorities::PRE_VALIDATE],
        ];
    }

    public function activateAccount(ViewEvent $event)
    {
    
       $route =  $event->getRequest()->attributes->get('_route');
      if ('api_account_activation_requests_post_collection' !== $route)
       {
           return null;
       }
        $activationRequest = $event->getControllerResult();
         $this->validator->validate($activationRequest);
        $user = $this->userRepo->findOneByActivationCode($activationRequest->getActivationCode());
         if ($user) 
         {
                        $user
                           ->setActivationCode(null)
                        ;   
                        $this->em->persist($user);
                        $this->em->flush();
                 $event->setResponse(new JsonResponse(["message"=>"activation successed !"], 200));           
           }else{
                 $event->setResponse(new JsonResponse([
                    "status"=>400,
                    "message"=>"Bad Request"
                ], 200));           

           }
    }
}
