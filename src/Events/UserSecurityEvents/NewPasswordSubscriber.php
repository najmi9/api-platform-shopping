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


final class NewPasswordSubscriber implements EventSubscriberInterface
{
    private $encoder, $em, $userRepo;
    private $validator;


    public function __construct(UserPasswordEncoderInterface $encoder, EntityManagerInterface $em, UserRepository $userRepo, ValidatorInterface $validator)
    {
        $this->encoder = $encoder;
        $this->em = $em;
        $this->userRepo = $userRepo;
        $this->validator = $validator;

    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['newPasswordReset', EventPriorities::PRE_VALIDATE],
        ];
    }

    public function newPasswordReset(ViewEvent $event)
    {
        $request = $event->getRequest();
        if ('api_new_password_requests_post_collection' !== $request->attributes->get('_route')) {
            return;
        }
         $newPasswordRequest = $event->getControllerResult();// password
         $this->validator->validate($newPasswordRequest);
         
        $user = $this->userRepo->findOneByResetPasswordCode(
            (string)$newPasswordRequest->resetPasswordCode);
         if ($user) {
                        $user
                           ->setPassword($this->encoder->encodePassword($user,
                             $newPasswordRequest->password))
                           ->setResetPasswordCode(null)
                        ;   
                        $this->em->persist($user);
                        $this->em->flush();
                 $event->setResponse(new JsonResponse([
                    "status"=>200,
                   "message"=>"le password est bien modifié !"
                 ], 200));           
           }else{
                 $event->setResponse(new JsonResponse([
                    "status"=>400,
                    "message"=>"Bad Request"
                ], 400));           

           }
    }
}
